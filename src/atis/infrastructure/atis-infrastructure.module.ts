import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GpioConfigSqlite } from './entity/config/gpio-config-sqlite.entity';
import { GPIO_CONFIG_DAO } from '../domain/dao/config/gpio-config.dao';
import { MESSAGE_CONFIG_DAO } from '../domain/dao/config/message-config.dao';
import { TTS_CONFIG_DAO } from '../domain/dao/config/tts-config.dao';
import { WEATHER_DATA_CONFIG_DAO } from '../domain/dao/config/weather-data-config.dao';
import { GpioConfigSqliteDAO } from './dao/config/gpio-config-sqlite.dao';
import { MessageConfigSqliteDAO } from './dao/config/message-config-sqlite.dao';
import { TTSConfigSqliteDAO } from './dao/config/tts-config-sqlite.dao';
import { WeatherDataConfigSqliteDAO } from './dao/config/weather-data-config-sqlite.dao';
import { MessageConfigSqlite } from './entity/config/message-config-sqlite.entity';
import { TTSConfigSqlite } from './entity/config/tts-config-sqlite.entity';
import { WeatherDataConfigSqlite } from './entity/config/weather-data-config-sqlite.entity';
import { DailyStatsSqlite } from './entity/stats/daily-stats-sqlite.entity';
import { DailyStatsSqliteDAO } from './dao/stats/daily-stats-sqlite.dao';
import { DAILY_STATS_REPOSITORY } from '../domain/dao/stats/daily-stats.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GpioConfigSqlite,
      MessageConfigSqlite,
      TTSConfigSqlite,
      WeatherDataConfigSqlite,
      DailyStatsSqlite,
    ]),
  ],
  exports: [GPIO_CONFIG_DAO, MESSAGE_CONFIG_DAO, TTS_CONFIG_DAO, WEATHER_DATA_CONFIG_DAO, DAILY_STATS_REPOSITORY],
  providers: [
    GpioConfigSqliteDAO,
    MessageConfigSqliteDAO,
    TTSConfigSqliteDAO,
    WeatherDataConfigSqliteDAO,
    DailyStatsSqliteDAO,
    { provide: GPIO_CONFIG_DAO, useExisting: GpioConfigSqliteDAO },
    { provide: MESSAGE_CONFIG_DAO, useExisting: MessageConfigSqliteDAO },
    { provide: TTS_CONFIG_DAO, useExisting: TTSConfigSqliteDAO },
    { provide: WEATHER_DATA_CONFIG_DAO, useExisting: WeatherDataConfigSqliteDAO },
    { provide: DAILY_STATS_REPOSITORY, useExisting: DailyStatsSqliteDAO },
  ],
})
export class AtisInfrastructureModule {}
