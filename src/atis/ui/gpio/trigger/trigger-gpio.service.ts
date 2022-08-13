import { Inject, Injectable, LoggerService, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { TriggerService } from '../../../domain/service/trigger/trigger.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Gpio } from 'onoff';
import { GetConfigQuery } from '../../../application/query/get-config.query';
import { Config } from '../../../domain/valueobject/config.vo';
import { SynthesizeCurrentWeatherCommand } from '../../../application/command/synthesize-current-weather.command';
import { PlaySoundCommand } from '../../../application/command/play-sound.command';
import { join } from 'path';
import { retryAsync } from '../../../../utils/retry';

@Injectable()
export class TriggerGpioService implements TriggerService, OnApplicationBootstrap, OnApplicationShutdown {
  private gpioInput: Gpio | undefined;
  private gpioOutput: Gpio | undefined;
  private tries = 0;
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @Inject('GpioTriggerLogger') private readonly logger: LoggerService,
  ) {}

  async listen(): Promise<void> {
    try {
      const config = await this.queryBus.execute<GetConfigQuery, Config>(new GetConfigQuery());

      this.gpioInput = new Gpio(config.gpio.input, 'in', 'falling');
      this.gpioOutput = new Gpio(config.gpio.output, 'out', 'none', { debounceTimeout: 10 });
      this.logger.log(`GPIO trigger running. Waiting for signal on pin ${config.gpio.input}.`);
      this.gpioInput.watch(async (err, value) => {
        this.logger.debug(`Received signal: ${value}`);
        if (err) {
          throw err;
        }
        await retryAsync(async () => this.synthesizeCurrentWeather(config), {
          maxTries: 3,
          afterEachError: (e) => {
            this.logger.error(e);
            this.gpioOutput.writeSync(Gpio.LOW);
            this.logger.debug(`PTT stop: GPIO value: ${this.gpioOutput.readSync()}`);
          },
          afterLastError: (e) => {
            throw e;
          },
        });
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

  async synthesizeCurrentWeather(config: Config): Promise<void> {
    const mp3Path = await this.commandBus.execute<SynthesizeCurrentWeatherCommand, string>(
      new SynthesizeCurrentWeatherCommand(config, join(process.cwd(), 'output.mp3')),
    );

    this.gpioOutput.writeSync(Gpio.HIGH);
    this.logger.debug(`PTT start: GPIO value: ${this.gpioOutput.readSync()}`);

    await this.commandBus.execute<PlaySoundCommand, void>(new PlaySoundCommand(mp3Path));

    this.gpioOutput.writeSync(Gpio.LOW);
    this.logger.debug(`PTT stop: GPIO value: ${this.gpioOutput.readSync()}`);
  }

  unlisten(): void {
    this.gpioOutput.writeSync(Gpio.LOW);

    this.gpioInput.unexport();
    this.gpioOutput.unexport();
  }

  onApplicationBootstrap(): void {
    this.listen();
  }

  onApplicationShutdown(): void {
    this.unlisten();
  }
}
