import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GpioConfigSqlite } from './entity/config/gpio-config-sqlite.entity';
import { GET_GPIO_CONFIG_REPOSITORY } from '../domain/repository/config/get-gpio-config.repository';
import { GET_MESSAGE_CONFIG_REPOSITORY } from '../domain/repository/config/get-message-config.repository';
import { GET_TTS_CONFIG_REPOSITORY } from '../domain/repository/config/get-tts-config.repository';
import { GET_WEATHER_DATA_CONFIG_REPOSTIORY } from '../domain/repository/config/get-weather-data-config.repository';
import { GetGpioConfigSqliteRepository } from './repository/config/get-gpio-config-sqlite.repository';
import { GetMessageConfigSqliteRepository } from './repository/config/get-message-config-sqlite.repository';
import { GetTtsConfigSqliteRepository } from './repository/config/get-tts-config-sqlite.repository';
import { GetWeatherDataConfigSqliteRepository } from './repository/config/get-weather-data-config-sqlite.repository';
import { MessageConfigSqlite } from './entity/config/message-config-sqlite.entity';
import { TtsConfigSqlite } from './entity/config/tts-config-sqlite.entity';
import { WeatherDataConfigSqlite } from './entity/config/weather-data-config-sqlite.entity';
import { DailyStatsSqlite } from './entity/stats/daily-stats-sqlite.entity';
import { GetDailyStatsSqliteRepository } from './repository/stats/get-daily-stats-sqlite.repository';
import { GET_DAILY_STATS_REPOSITORY } from '../domain/repository/stats/get-daily-stats.repository';
import { TtsGoogleService } from './service/tts/tts-google.service';
import { TTS_SERVICE } from '../domain/service/tts/tts.service';
import { HttpModule } from '@nestjs/axios';
import { WeatherHttpProvider } from './service/weather/provider/http/weather-http.provider';
import { WeatherRealtimeTxtParser } from './service/weather/parser/realtimetxt/weather-realtime-txt.parser';
import { WEATHER_PROVIDER } from '../domain/service/weather/weather.provider';
import { WEATHER_PARSER } from '../domain/service/weather/weather.parser';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      GpioConfigSqlite,
      MessageConfigSqlite,
      TtsConfigSqlite,
      WeatherDataConfigSqlite,
      DailyStatsSqlite,
    ]),
  ],
  exports: [
    TTS_SERVICE,
    WEATHER_PROVIDER,
    GET_GPIO_CONFIG_REPOSITORY,
    GET_MESSAGE_CONFIG_REPOSITORY,
    GET_TTS_CONFIG_REPOSITORY,
    GET_WEATHER_DATA_CONFIG_REPOSTIORY,
    GET_DAILY_STATS_REPOSITORY,
  ],
  providers: [
    WeatherHttpProvider,
    WeatherRealtimeTxtParser,
    GetGpioConfigSqliteRepository,
    GetMessageConfigSqliteRepository,
    GetTtsConfigSqliteRepository,
    GetWeatherDataConfigSqliteRepository,
    GetDailyStatsSqliteRepository,
    TtsGoogleService,
    { provide: TTS_SERVICE, useExisting: TtsGoogleService },
    { provide: WEATHER_PROVIDER, useExisting: WeatherHttpProvider },
    { provide: WEATHER_PARSER, useExisting: WeatherRealtimeTxtParser },
    { provide: GET_GPIO_CONFIG_REPOSITORY, useExisting: GetGpioConfigSqliteRepository },
    { provide: GET_MESSAGE_CONFIG_REPOSITORY, useExisting: GetMessageConfigSqliteRepository },
    { provide: GET_TTS_CONFIG_REPOSITORY, useExisting: GetTtsConfigSqliteRepository },
    { provide: GET_WEATHER_DATA_CONFIG_REPOSTIORY, useExisting: GetWeatherDataConfigSqliteRepository },
    { provide: GET_DAILY_STATS_REPOSITORY, useExisting: GetDailyStatsSqliteRepository },
  ],
})
export class AtisInfrastructureModule {}
