import { Inject, Injectable, LoggerService, OnApplicationBootstrap } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Gpio } from 'onoff';
import { GetConfigQuery } from '../../../application/query/get-config.query';
import { Config } from '../../../domain/valueobject/config.vo';
import { SynthesizeCurrentWeatherCommand } from '../../../application/command/synthesize-current-weather.command';
import { join } from 'path';
import { retryAsync } from '../../../../utils/retry';
import { TransmitMessageCommand } from '../../../application/command/transmit-message.command';

@Injectable()
export class TriggerGpioService implements OnApplicationBootstrap {
  private gpioInput?: Gpio;
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @Inject('GpioTriggerLogger') private readonly logger: LoggerService,
  ) {}

  async listen(): Promise<void> {
    try {
      const config = await this.queryBus.execute<GetConfigQuery, Config>(new GetConfigQuery());
      // TODO typeguard
      this.gpioInput = new Gpio(config.input.gpioInputPin, 'in', 'falling');
      this.logger.log(`GPIO trigger running. Waiting for signal on pin ${config.input.gpioInputPin}.`);
      this.gpioInput.watch(async (err, value) => {
        this.logger.debug(`Received signal: ${value}`);
        if (err) {
          throw err;
        }
        await retryAsync(async () => this.synthesizeCurrentWeather(), {
          maxTries: 3,
          afterEachError: (e) => {
            this.logger.warn('Error during synthesizeCurrentWeather, retrying...');
            this.logger.error(e);
          },
          afterLastError: (e) => {
            throw e;
          },
        });
      });
    } catch (e) {
      this.logger.error(e);
      this.logger.error('Exiting process.');
      process.exit(1);
    }
  }

  async synthesizeCurrentWeather(): Promise<void> {
    // reload config to not miss changes
    const config = await this.queryBus.execute<GetConfigQuery, Config>(new GetConfigQuery());
    const mp3Path = await this.commandBus.execute<SynthesizeCurrentWeatherCommand, string>(
      new SynthesizeCurrentWeatherCommand(config, join(process.cwd(), 'output.mp3')),
    );

    await this.commandBus.execute<TransmitMessageCommand, void>(new TransmitMessageCommand(mp3Path, config.output));
  }

  onApplicationBootstrap(): void {
    this.logger.debug('Starting GPIO trigger service.');
    this.listen();
  }
}
