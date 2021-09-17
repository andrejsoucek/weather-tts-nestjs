import { Inject, Injectable, LoggerService, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { TriggerService } from '../../../domain/service/trigger/trigger.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Gpio } from 'onoff';
import { GetConfigQuery } from '../../../application/query/get-config.query';
import { Config } from '../../../domain/valueobject/config.vo';
import { GetCurrentWeatherQuery } from '../../../application/query/get-current-weather.query';
import { Weather } from '../../../domain/valueobject/weather.vo';
import { ComposeMessageCommand } from '../../../application/command/compose-message.command';
import { SynthesizeCommand } from '../../../application/command/synthesize.command';
import path from 'path';
import { PlaySoundCommand } from '../../../application/command/play-sound.command';

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
