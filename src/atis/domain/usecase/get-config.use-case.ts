import { Inject, Injectable } from '@nestjs/common';
import { GET_GPIO_CONFIG_REPOSITORY, GetGpioConfigRepository } from '../repository/config/get-gpio-config.repository';
import {
  GET_MESSAGE_CONFIG_REPOSITORY,
  GetMessageConfigRepository,
} from '../repository/config/get-message-config.repository';
import { GET_TTS_CONFIG_REPOSITORY, GetTtsConfigRepository } from '../repository/config/get-tts-config.repository';
import {
  GET_WEATHER_DATA_CONFIG_REPOSTIORY,
  GetWeatherDataConfigRepository,
} from '../repository/config/get-weather-data-config.repository';
import { Config } from '../valueobject/config.vo';

@Injectable()
export class GetConfigUseCase {
  constructor(
    @Inject(GET_GPIO_CONFIG_REPOSITORY) private readonly gpioConfigRepository: GetGpioConfigRepository,
    @Inject(GET_MESSAGE_CONFIG_REPOSITORY) private readonly messageConfigRepository: GetMessageConfigRepository,
    @Inject(GET_TTS_CONFIG_REPOSITORY) private readonly ttsConfigRepository: GetTtsConfigRepository,
    @Inject(GET_WEATHER_DATA_CONFIG_REPOSTIORY)
    private readonly weatherDataConfigRepository: GetWeatherDataConfigRepository,
  ) {}

  async get(): Promise<Config> {
    const gpio = await this.gpioConfigRepository.getGpioConfig();
    const message = await this.messageConfigRepository.getMessageConfig();
    const tts = await this.ttsConfigRepository.getTtsConfig();
    const weatherData = await this.weatherDataConfigRepository.getWeatherDataConfig();

    return new Config(gpio, tts, weatherData, message);
  }
}
