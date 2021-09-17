import {
  BadRequestException,
  Inject,
  Injectable,
  LoggerService,
  NotFoundException,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { TriggerService } from '../../domain/service/trigger/trigger.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetConfigQuery } from '../../application/query/get-config.query';
import { Config } from '../../domain/valueobject/config.vo';
import { GetCurrentWeatherQuery } from '../../application/query/get-current-weather.query';
import { Weather } from '../../domain/valueobject/weather.vo';
import { ComposeMessageCommand } from '../../application/command/compose-message.command';
import { WeatherNotFoundException } from '../../domain/exception/weather-not-found.exception';
import { UnexpectedWeatherFormatException } from '../../domain/exception/unexpected-weather-format.exception';

@Injectable()
export class TriggerManualService implements TriggerService, OnApplicationBootstrap, OnApplicationShutdown {
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
      } catch (e) {
        if (e instanceof WeatherNotFoundException) {
          throw new NotFoundException('Weather data not found on the provided URL.');
        }
        if (e instanceof UnexpectedWeatherFormatException) {
          throw new BadRequestException('Weather data could not be parsed from the provided URL.');
        }
        throw e;
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
