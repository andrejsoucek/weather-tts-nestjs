import { Inject, Injectable, LoggerService, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { TriggerService } from '../../../domain/service/trigger/trigger.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Gpio } from 'onoff';
import { GetConfigQuery } from '../../../application/query/get-config.query';
import { Config } from '../../../domain/valueobject/config.vo';
import { SynthesizeCurrentWeatherCommand } from '../../../application/command/synthesize-current-weather.command';
import { PlaySoundCommand } from '../../../application/command/play-sound.command';
import { join } from 'path';

@Injectable()
export class TriggerGpioService implements TriggerService, OnApplicationBootstrap, OnApplicationShutdown {
  private gpioInput: Gpio | undefined;
  private gpioOutput: Gpio | undefined;
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
      this.logger.log(`GPIO trigger running. Waiting for signal on pin ${this.gpioInput}.`);
      this.gpioInput.watch(async (err, value) => {
        this.logger.debug(`Received signal: ${value}`);
        if (err) {
          this.logger.error(err);
          return;
        }

        const mp3Path = await this.commandBus.execute<SynthesizeCurrentWeatherCommand, string>(
          new SynthesizeCurrentWeatherCommand(config, join(process.cwd(), 'output.mp3')),
        );

        this.gpioOutput.writeSync(1);
        this.logger.debug(`PTT start: GPIO value: ${this.gpioOutput.readSync()}`);
        await this.commandBus.execute<PlaySoundCommand, void>(new PlaySoundCommand(mp3Path));
        this.gpioOutput.writeSync(0);
      });
    } catch (e) {
      this.logger.error(e);
    } finally {
      this.gpioOutput.writeSync(0);
    }
  }

  unlisten(): void {
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
