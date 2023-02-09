import { Inject, Injectable } from '@nestjs/common';
import {
  GET_MESSAGE_CONFIG_REPOSITORY,
  GetMessageConfigRepository,
} from '../repository/config/get-message-config.repository';
import { GET_TTS_CONFIG_REPOSITORY, GetTtsConfigRepository } from '../repository/config/get-tts-config.repository';
import {
  GET_WEATHER_DATA_CONFIG_REPOSITORY,
  GetWeatherDataConfigRepository,
} from '../repository/config/get-weather-data-config.repository';
import { Config } from '../valueobject/config.vo';
import {
  GET_INPUT_CONFIG_REPOSITORY,
  GetInputConfigRepository,
} from '../repository/config/get-input-config.repository';
import {
  GET_OUTPUT_CONFIG_REPOSITORY,
  GetOutputConfigRepository,
} from '../repository/config/get-output-config.repository';

@Injectable()
export class GetConfigUseCase {
  constructor(
    @Inject(GET_INPUT_CONFIG_REPOSITORY) private readonly inputConfigRepository: GetInputConfigRepository,
    @Inject(GET_OUTPUT_CONFIG_REPOSITORY) private readonly outputConfigRepository: GetOutputConfigRepository,
    @Inject(GET_MESSAGE_CONFIG_REPOSITORY) private readonly messageConfigRepository: GetMessageConfigRepository,
    @Inject(GET_TTS_CONFIG_REPOSITORY) private readonly ttsConfigRepository: GetTtsConfigRepository,
    @Inject(GET_WEATHER_DATA_CONFIG_REPOSITORY)
    private readonly weatherDataConfigRepository: GetWeatherDataConfigRepository,
  ) {}

  async get(): Promise<Config> {
    const input = await this.inputConfigRepository.getInputConfig();
    const output = await this.outputConfigRepository.getOutputConfig();
    const message = await this.messageConfigRepository.getMessageConfig();
    const tts = await this.ttsConfigRepository.getTtsConfig();
    const weatherData = await this.weatherDataConfigRepository.getWeatherDataConfig();

    return new Config(input, output, tts, weatherData, message);
  }
}
