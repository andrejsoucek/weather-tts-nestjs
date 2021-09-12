import {
  BadRequestException,
  Injectable,
  LoggerService,
  NotFoundException,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { TriggerService } from '../../../domain/service/trigger/trigger.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Gpio } from 'onoff';
import { GetConfigQuery } from '../../../application/query/get-config.query';
import { Config } from '../../../domain/valueobject/config.vo';
import { GetCurrentWeatherQuery } from '../../../application/query/get-current-weather.query';
import { Weather } from '../../../domain/valueobject/weather.vo';
import { ComposeMessageCommand } from '../../../application/command/compose-message.command';
import { WeatherNotFoundException } from '../../../domain/exception/weather-not-found.exception';
import { UnexpectedWeatherFormatException } from '../../../domain/exception/unexpected-weather-format.exception';

@Injectable()
export class TriggerGpioService implements TriggerService, OnApplicationBootstrap, OnApplicationShutdown {
  private gpioInput: Gpio | undefined;
  private gpioOutput: Gpio | undefined;
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly logger: LoggerService,
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
      });
    } catch (e) {
      if (e instanceof WeatherNotFoundException) {
        throw new NotFoundException('Weather data not found on the provided URL.');
      }
      if (e instanceof UnexpectedWeatherFormatException) {
        throw new BadRequestException('Weather data could not be parsed from the provided URL.');
      }
      throw e;
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
