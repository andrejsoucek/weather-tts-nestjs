import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GET_MESSAGE_CONFIG_REPOSITORY } from '../domain/repository/config/get-message-config.repository';
import { GET_TTS_CONFIG_REPOSITORY } from '../domain/repository/config/get-tts-config.repository';
import { GET_WEATHER_DATA_CONFIG_REPOSITORY } from '../domain/repository/config/get-weather-data-config.repository';
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
import { SAVE_MESSAGE_CONFIG_REPOSITORY } from '../domain/repository/config/save-message-config.repository';
import { SAVE_TTS_CONFIG_REPOSITORY } from '../domain/repository/config/save-tts-config.repository';
import { SAVE_WEATHER_DATA_CONFIG_REPOSTIORY } from '../domain/repository/config/save-weather-data-config.repository';
import { SaveMessageConfigSqliteRepository } from './repository/config/save-message-config-sqlite.repository';
import { SaveTtsConfigSqliteRepository } from './repository/config/save-tts-config-sqlite.repository';
import { SaveWeatherDataConfigSqliteRepository } from './repository/config/save-weather-data-config-sqlite.repository';
import { TextToSpeechClient } from '@google-cloud/text-to-speech/build/src/v1';
import { PLAYER_SERVICE } from '../domain/service/tts/player.service';
import { PlaysoundPlayerService } from './service/tts/playsound-player.service';
import { UpdateDailyStatsSqliteRepository } from './repository/stats/update-daily-stats-sqlite.repository';
import { UPDATE_DAILY_STATS_REPOSITORY } from '../domain/repository/stats/update-daily-stats.repository';
import { PUSH_TO_TALK_SERVICE } from '../domain/service/ptt/push-to-talk.service';
import { GpioPushToTalkService } from './service/ptt/gpio-push-to-talk.service';
import { DirectPushToTalkService } from './service/ptt/direct-push-to-talk.service';
import { GET_INPUT_CONFIG_REPOSITORY } from '../domain/repository/config/get-input-config.repository';
import { GetInputConfigSqliteRepository } from './repository/config/get-input-config-sqlite.repository';
import { GetOutputConfigSqliteRepository } from './repository/config/get-output-config-sqlite.repository';
import { GET_OUTPUT_CONFIG_REPOSITORY } from '../domain/repository/config/get-output-config.repository';
import { InputConfigSqlite } from './entity/config/input-config-sqlite.entity';
import { OutputConfigSqlite } from './entity/config/output-config-sqlite.entity';
import { SaveInputConfigSqliteRepository } from './repository/config/save-input-config-sqlite.repository';
import { SaveOutputConfigSqliteRepository } from './repository/config/save-output-config-sqlite.repository';
import { SAVE_INPUT_CONFIG_REPOSITORY } from '../domain/repository/config/save-input-config.repository';
import { SAVE_OUTPUT_CONFIG_REPOSITORY } from '../domain/repository/config/save-output-config.repository';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      InputConfigSqlite,
      OutputConfigSqlite,
      MessageConfigSqlite,
      TtsConfigSqlite,
      WeatherDataConfigSqlite,
      DailyStatsSqlite,
    ]),
  ],
  exports: [
    PLAYER_SERVICE,
    PUSH_TO_TALK_SERVICE,
    TTS_SERVICE,
    WEATHER_PROVIDER,
    GET_INPUT_CONFIG_REPOSITORY,
    GET_OUTPUT_CONFIG_REPOSITORY,
    GET_MESSAGE_CONFIG_REPOSITORY,
    GET_TTS_CONFIG_REPOSITORY,
    GET_WEATHER_DATA_CONFIG_REPOSITORY,
    GET_DAILY_STATS_REPOSITORY,
    SAVE_INPUT_CONFIG_REPOSITORY,
    SAVE_OUTPUT_CONFIG_REPOSITORY,
    SAVE_MESSAGE_CONFIG_REPOSITORY,
    SAVE_TTS_CONFIG_REPOSITORY,
    SAVE_WEATHER_DATA_CONFIG_REPOSTIORY,
    UPDATE_DAILY_STATS_REPOSITORY,
  ],
  providers: [
    WeatherHttpProvider,
    WeatherRealtimeTxtParser,
    GetInputConfigSqliteRepository,
    GetOutputConfigSqliteRepository,
    GetMessageConfigSqliteRepository,
    GetTtsConfigSqliteRepository,
    GetWeatherDataConfigSqliteRepository,
    GetDailyStatsSqliteRepository,
    SaveInputConfigSqliteRepository,
    SaveOutputConfigSqliteRepository,
    SaveMessageConfigSqliteRepository,
    SaveTtsConfigSqliteRepository,
    SaveWeatherDataConfigSqliteRepository,
    TtsGoogleService,
    PlaysoundPlayerService,
    UpdateDailyStatsSqliteRepository,
    { provide: 'InfrastructureLogger', useFactory: () => new Logger('Infrastructure') },
    { provide: 'GoogleTTSClient', useFactory: () => new TextToSpeechClient() },
    { provide: PLAYER_SERVICE, useExisting: PlaysoundPlayerService },
    {
      provide: PUSH_TO_TALK_SERVICE,
      useClass: process.env.OUTPUT_MODE === 'direct' ? DirectPushToTalkService : GpioPushToTalkService,
    },
    { provide: TTS_SERVICE, useExisting: TtsGoogleService },
    { provide: WEATHER_PROVIDER, useExisting: WeatherHttpProvider },
    { provide: WEATHER_PARSER, useExisting: WeatherRealtimeTxtParser },
    { provide: GET_INPUT_CONFIG_REPOSITORY, useExisting: GetInputConfigSqliteRepository },
    { provide: GET_OUTPUT_CONFIG_REPOSITORY, useExisting: GetOutputConfigSqliteRepository },
    { provide: GET_MESSAGE_CONFIG_REPOSITORY, useExisting: GetMessageConfigSqliteRepository },
    { provide: GET_TTS_CONFIG_REPOSITORY, useExisting: GetTtsConfigSqliteRepository },
    { provide: GET_WEATHER_DATA_CONFIG_REPOSITORY, useExisting: GetWeatherDataConfigSqliteRepository },
    { provide: GET_DAILY_STATS_REPOSITORY, useExisting: GetDailyStatsSqliteRepository },
    { provide: SAVE_INPUT_CONFIG_REPOSITORY, useExisting: SaveInputConfigSqliteRepository },
    { provide: SAVE_OUTPUT_CONFIG_REPOSITORY, useExisting: SaveOutputConfigSqliteRepository },
    { provide: SAVE_MESSAGE_CONFIG_REPOSITORY, useExisting: SaveMessageConfigSqliteRepository },
    { provide: SAVE_TTS_CONFIG_REPOSITORY, useExisting: SaveTtsConfigSqliteRepository },
    { provide: SAVE_WEATHER_DATA_CONFIG_REPOSTIORY, useExisting: SaveWeatherDataConfigSqliteRepository },
    { provide: UPDATE_DAILY_STATS_REPOSITORY, useExisting: UpdateDailyStatsSqliteRepository },
  ],
})
export class AtisInfrastructureModule {}
