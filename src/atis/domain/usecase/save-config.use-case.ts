import { Inject, Injectable } from '@nestjs/common';
import { Config } from '../valueobject/config.vo';
import {
  SAVE_MESSAGE_CONFIG_REPOSITORY,
  SaveMessageConfigRepository,
} from '../repository/config/save-message-config.repository';
import { SAVE_TTS_CONFIG_REPOSITORY, SaveTtsConfigRepository } from '../repository/config/save-tts-config.repository';
import {
  SAVE_WEATHER_DATA_CONFIG_REPOSTIORY,
  SaveWeatherDataConfigRepository,
} from '../repository/config/save-weather-data-config.repository';
import {
  SAVE_INPUT_CONFIG_REPOSITORY,
  SaveInputConfigRepository,
} from '../repository/config/save-input-config.repository';
import {
  SAVE_OUTPUT_CONFIG_REPOSITORY,
  SaveOutputConfigRepository,
} from '../repository/config/save-output-config.repository';

@Injectable()
export class SaveConfigUseCase {
  constructor(
    @Inject(SAVE_INPUT_CONFIG_REPOSITORY) private readonly inputConfigRepository: SaveInputConfigRepository,
    @Inject(SAVE_OUTPUT_CONFIG_REPOSITORY) private readonly outputConfigRepository: SaveOutputConfigRepository,
    @Inject(SAVE_MESSAGE_CONFIG_REPOSITORY) private readonly messageConfigRepository: SaveMessageConfigRepository,
    @Inject(SAVE_TTS_CONFIG_REPOSITORY) private readonly ttsConfigRepository: SaveTtsConfigRepository,
    @Inject(SAVE_WEATHER_DATA_CONFIG_REPOSTIORY)
    private readonly weatherDataConfigRepository: SaveWeatherDataConfigRepository,
  ) {}

  async save(config: Config): Promise<void> {
    await this.inputConfigRepository.saveInputConfig(config.input);
    await this.outputConfigRepository.saveOutputConfig(config.output);
    await this.messageConfigRepository.saveMessageConfig(config.message);
    await this.ttsConfigRepository.saveTTSConfig(config.tts);
    await this.weatherDataConfigRepository.saveWeatherDataConfig(config.weatherData);
  }
}
