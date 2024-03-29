import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { TTS_SERVICE, TtsService } from '../service/tts/tts.service';
import { WEATHER_PROVIDER, WeatherProvider } from '../service/weather/weather.provider';
import { MessageService } from '../service/message/message.service';
import { Config } from '../valueobject/config.vo';
import {
  UPDATE_DAILY_STATS_REPOSITORY,
  UpdateDailyStatsRepository,
} from '../repository/stats/update-daily-stats.repository';

@Injectable()
export class SynthesizeCurrentWeatherUseCase {
  constructor(
    @Inject(WEATHER_PROVIDER) private readonly weatherProvider: WeatherProvider,
    private readonly messageService: MessageService,
    @Inject(TTS_SERVICE) private readonly ttsService: TtsService,
    @Inject('MessageLogger') private readonly logger: LoggerService,
    @Inject(UPDATE_DAILY_STATS_REPOSITORY) private readonly updateDailyStatsRepository: UpdateDailyStatsRepository,
  ) {}

  async synthesize(config: Config, outputFilePath: string): Promise<string> {
    const weather = await this.weatherProvider.fetchCurrentWeather(config.weatherData.url);
    const message = this.messageService.composeMessage(weather, config.message);
    this.logger.debug(message);
    await this.updateDailyStatsRepository.updateDailyStats(message);

    return await this.ttsService.textToSpeech(message, config.tts.language, outputFilePath);
  }
}
