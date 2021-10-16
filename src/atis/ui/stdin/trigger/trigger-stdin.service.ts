import { Inject, Injectable, LoggerService, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { TriggerService } from '../../../domain/service/trigger/trigger.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetConfigQuery } from '../../../application/query/get-config.query';
import { Config } from '../../../domain/valueobject/config.vo';
import { SynthesizeCurrentWeatherCommand } from '../../../application/command/synthesize-current-weather.command';
import { PlaySoundCommand } from '../../../application/command/play-sound.command';
import { join } from 'path';

@Injectable()
export class TriggerStdinService implements TriggerService, OnApplicationBootstrap, OnApplicationShutdown {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @Inject('StdinTriggerLogger') private readonly logger: LoggerService,
  ) {}
  private stdinListener: NodeJS.ReadStream | undefined;

  listen(): void {
    this.logger.log('Manual trigger running. Press enter to pull the trigger.');
    this.stdinListener = process.stdin.on('data', async () => {
      try {
        const config = await this.queryBus.execute<GetConfigQuery, Config>(new GetConfigQuery());

        const mp3Path = await this.commandBus.execute<SynthesizeCurrentWeatherCommand, string>(
          new SynthesizeCurrentWeatherCommand(config, join(process.cwd(), 'output.mp3')),
        );

        await this.commandBus.execute<PlaySoundCommand, void>(new PlaySoundCommand(mp3Path));
      } catch (e) {
        this.logger.error(e);
      }
    });
  }

  unlisten(): void {
    if (this.stdinListener) {
      this.stdinListener.removeAllListeners();
    }
  }

  onApplicationBootstrap(): void {
    this.listen();
  }

  onApplicationShutdown(): void {
    this.unlisten();
  }
}
