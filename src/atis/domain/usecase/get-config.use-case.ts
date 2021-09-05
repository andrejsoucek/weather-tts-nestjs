import { Inject, Injectable } from '@nestjs/common';
import { GPIO_CONFIG_DAO, GpioConfigDAO } from '../dao/config/gpio-config.dao';
import { MESSAGE_CONFIG_DAO, MessageConfigDAO } from '../dao/config/message-config.dao';
import { TTS_CONFIG_DAO, TTSConfigDAO } from '../dao/config/tts-config.dao';
import { WEATHER_DATA_CONFIG_DAO, WeatherDataConfigDAO } from '../dao/config/weather-data-config.dao';
import { Config } from '../valueobject/config.vo';

@Injectable()
export class GetConfigUseCase {
  constructor(
    @Inject(GPIO_CONFIG_DAO) private readonly gpioConfigDAO: GpioConfigDAO,
    @Inject(MESSAGE_CONFIG_DAO) private readonly messageConfigDAO: MessageConfigDAO,
    @Inject(TTS_CONFIG_DAO) private readonly ttsConfigDAO: TTSConfigDAO,
    @Inject(WEATHER_DATA_CONFIG_DAO) private readonly weatherDataConfigDAO: WeatherDataConfigDAO,
  ) {}

  async get(): Promise<Config> {
    const gpio = await this.gpioConfigDAO.getGpioConfig();
    const message = await this.messageConfigDAO.getMessageConfig();
    const tts = await this.ttsConfigDAO.getTTSConfig();
    const weatherData = await this.weatherDataConfigDAO.getWeatherDataConfig();

    return new Config(gpio, tts, weatherData, message);
  }
}
