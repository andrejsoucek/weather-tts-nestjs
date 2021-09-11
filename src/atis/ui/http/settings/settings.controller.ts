import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetConfigQuery } from '../../../application/query/get-config.query';
import { Config } from '../../../domain/valueobject/config.vo';
import { SelectOption } from '../select-option.interface';
import { Comparator } from '../../../domain/enum/comparator.enum';
import { RunwayCondition } from '../../../domain/valueobject/runway-condition.vo';
import { SettingsTemplateProperties } from './settings-template.properties';
import { GetTtsLanguagesQuery } from '../../../application/query/get-tts-languages.query';
import { CircuitCondition } from '../../../domain/valueobject/circuit-condition.vo';
import { Weather } from '../../../domain/valueobject/weather.vo';
import { GetCurrentWeatherQuery } from '../../../application/query/get-current-weather.query';
import { MomentTimezone } from 'moment-timezone';
import { WeatherNotFoundException } from '../../../domain/exception/weather-not-found.exception';
import { UnexpectedWeatherFormatException } from '../../../domain/exception/unexpected-weather-format.exception';
import { ConfigDto } from '../dto/config.dto';
import { SaveConfigCommand } from '../../../application/command/save-config.command';
import { ComposeMessageCommand } from '../../../application/command/compose-message.command';

@Controller('/settings')
export class SettingsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @Inject('MomentTimezone') private readonly momentTimezone: MomentTimezone,
  ) {}

  @Get()
  @Render('settings/index')
  async renderSettings(): Promise<SettingsTemplateProperties> {
    const config = await this.queryBus.execute<GetConfigQuery, Config>(new GetConfigQuery());
    const languages = await this.queryBus.execute<GetTtsLanguagesQuery, string[]>(new GetTtsLanguagesQuery());
    const languagesOptions = languages.map(this.mapSelectOptions(config.tts.language));
    const tzs = this.momentTimezone.names();
    const rwySettings = config.message.rwy.map(this.mapTextConditions);
    const circuitSettings = config.message.circuits.map(this.mapTextConditions);
    return { config, languagesOptions, tzs, rwySettings, circuitSettings };
  }

  @Post('/save')
  @HttpCode(204)
  async saveConfiguration(@Body() configDto: ConfigDto): Promise<void> {
    await this.commandBus.execute(new SaveConfigCommand(configDto.toValueObject()));
  }

  @Get('weatherTest')
  async getWeatherForTest(@Query('url') url: string): Promise<Weather> {
    try {
      return await this.queryBus.execute<GetCurrentWeatherQuery, Weather>(new GetCurrentWeatherQuery(url));
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

  @Post('previewMessage')
  @HttpCode(200)
  async getComposedMessage(@Body('messageTemplate') messageTemplate: string): Promise<{ message: string }> {
    try {
      const config = await this.queryBus.execute<GetConfigQuery, Config>(new GetConfigQuery());
      const weather = await this.queryBus.execute<GetCurrentWeatherQuery, Weather>(
        new GetCurrentWeatherQuery(config.weatherData.url),
      );
      return {
        message: await this.commandBus.execute<ComposeMessageCommand, string>(
          new ComposeMessageCommand(weather, Object.assign(config.message, { template: messageTemplate })),
        ),
      };
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

  private mapTextConditions = (c: RunwayCondition | CircuitCondition) => ({
    ...c,
    options: Object.values(Comparator).map(this.mapSelectOptions(c.comparator)),
  });

  private mapSelectOptions =
    (selected: string) =>
    (val: string): SelectOption => ({ id: val, label: val, selected: selected === val });
}
