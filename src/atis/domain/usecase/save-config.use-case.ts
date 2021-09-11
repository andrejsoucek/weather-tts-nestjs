import { Inject, Injectable } from '@nestjs/common';
import { Config } from '../valueobject/config.vo';
import {
  SAVE_GPIO_CONFIG_REPOSITORY,
  SaveGpioConfigRepository,
} from '../repository/config/save-gpio-config.repository';
import {
  SAVE_MESSAGE_CONFIG_REPOSITORY,
  SaveMessageConfigRepository,
} from '../repository/config/save-message-config.repository';
import { SAVE_TTS_CONFIG_REPOSITORY, SaveTtsConfigRepository } from '../repository/config/save-tts-config.repository';
import {
  SAVE_WEATHER_DATA_CONFIG_REPOSTIORY,
  SaveWeatherDataConfigRepository,
} from '../repository/config/save-weather-data-config.repository';

@Injectable()
export class SaveConfigUseCase {
  constructor(
    @Inject(SAVE_GPIO_CONFIG_REPOSITORY) private readonly gpioConfigRepository: SaveGpioConfigRepository,
    @Inject(SAVE_MESSAGE_CONFIG_REPOSITORY) private readonly messageConfigRepository: SaveMessageConfigRepository,
    @Inject(SAVE_TTS_CONFIG_REPOSITORY) private readonly ttsConfigRepository: SaveTtsConfigRepository,
    @Inject(SAVE_WEATHER_DATA_CONFIG_REPOSTIORY)
    private readonly weatherDataConfigRepository: SaveWeatherDataConfigRepository,
  ) {}

  async save(config: Config): Promise<void> {
    await this.gpioConfigRepository.saveGpioConfig(config.gpio);
    await this.messageConfigRepository.saveMessageConfig(config.message);
    await this.ttsConfigRepository.saveTTSConfig(config.tts);
    await this.weatherDataConfigRepository.saveWeatherDataConfig(config.weatherData);
  }
}
