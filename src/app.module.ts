import { Module } from '@nestjs/common';
import { AtisModule } from './atis/atis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GpioConfigSqlite } from './atis/infrastructure/entity/config/gpio-config-sqlite.entity';
import { MessageConfigSqlite } from './atis/infrastructure/entity/config/message-config-sqlite.entity';
import { TTSConfigSqlite } from './atis/infrastructure/entity/config/tts-config-sqlite.entity';
import { WeatherDataConfigSqlite } from './atis/infrastructure/entity/config/weather-data-config-sqlite.entity';
import { DailyStatsSqlite } from './atis/infrastructure/entity/stats/daily-stats-sqlite.entity';

@Module({
  imports: [
    AtisModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [GpioConfigSqlite, MessageConfigSqlite, TTSConfigSqlite, WeatherDataConfigSqlite, DailyStatsSqlite],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
