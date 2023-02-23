import { Inject, Injectable, LoggerService, OnApplicationBootstrap } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetConfigQuery } from '../../../application/query/get-config.query';
import { Config } from '../../../domain/valueobject/config.vo';
import { SynthesizeCurrentWeatherCommand } from '../../../application/command/synthesize-current-weather.command';
import { join } from 'path';
import { TransmitMessageCommand } from '../../../application/command/transmit-message.command';

@Injectable()
export class TriggerStdinService implements OnApplicationBootstrap {
  private stdinListener?: NodeJS.ReadStream;
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @Inject('StdinTriggerLogger') private readonly logger: LoggerService,
  ) {}

  listen(): void {
    this.logger.log('Manual trigger running. Press enter to pull the trigger.');
    this.stdinListener = process.stdin.on('data', async () => {
      try {
        const config = await this.queryBus.execute<GetConfigQuery, Config>(new GetConfigQuery());

        const mp3Path = await this.commandBus.execute<SynthesizeCurrentWeatherCommand, string>(
          new SynthesizeCurrentWeatherCommand(config, join(process.cwd(), 'output.mp3')),
        );

        await this.commandBus.execute<TransmitMessageCommand, void>(new TransmitMessageCommand(mp3Path, config.output));
      } catch (e) {
        this.logger.error(e);
        this.logger.error('Exiting process.');
        process.exit(1);
      }
    });
  }

  onApplicationBootstrap(): void {
    this.logger.debug('Starting stdin trigger service.');
    this.listen();
  }
}
