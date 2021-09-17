import { Inject, Injectable, LoggerService, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { TriggerService } from '../../../domain/service/trigger/trigger.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetConfigQuery } from '../../../application/query/get-config.query';
import { Config } from '../../../domain/valueobject/config.vo';
import { GetCurrentWeatherQuery } from '../../../application/query/get-current-weather.query';
import { Weather } from '../../../domain/valueobject/weather.vo';
import { ComposeMessageCommand } from '../../../application/command/compose-message.command';
import { SynthesizeCommand } from '../../../application/command/synthesize.command';
import * as path from 'path';
import { PlaySoundCommand } from '../../../application/command/play-sound.command';

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
        const weather = await this.queryBus.execute<GetCurrentWeatherQuery, Weather>(
          new GetCurrentWeatherQuery(config.weatherData.url),
        );
        const message = await this.commandBus.execute<ComposeMessageCommand, string>(
          new ComposeMessageCommand(weather, config.message),
        );
        this.logger.debug(message);
        const mp3Path = await this.commandBus.execute<SynthesizeCommand, string>(
          new SynthesizeCommand(message, config.tts.language, path.join(process.cwd(), 'output.mp3')),
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
