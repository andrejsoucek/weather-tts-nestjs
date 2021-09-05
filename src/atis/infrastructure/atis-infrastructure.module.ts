import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GpioConfigSqlite } from './entity/config/gpio-config-sqlite.entity';
import { MessageConfigSqlite } from './entity/config/message-config-sqlite.entity';
import { TTSConfigSqlite } from './entity/config/tts-config-sqlite.entity';
import { WeatherDataConfigSqlite } from './entity/config/weather-data-config-sqlite.entity';
import { DailyStatsSqlite } from './entity/stats/daily-stats-sqlite.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [GpioConfigSqlite, MessageConfigSqlite, TTSConfigSqlite, WeatherDataConfigSqlite, DailyStatsSqlite],
      synchronize: true,
    }),
  ],
})
export class AtisInfrastructureModule {}
