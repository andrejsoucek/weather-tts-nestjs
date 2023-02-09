import { Module } from '@nestjs/common';
import { AtisModule } from './atis/atis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageConfigSqlite } from './atis/infrastructure/entity/config/message-config-sqlite.entity';
import { TtsConfigSqlite } from './atis/infrastructure/entity/config/tts-config-sqlite.entity';
import { WeatherDataConfigSqlite } from './atis/infrastructure/entity/config/weather-data-config-sqlite.entity';
import { DailyStatsSqlite } from './atis/infrastructure/entity/stats/daily-stats-sqlite.entity';
import { InputConfigSqlite } from './atis/infrastructure/entity/config/input-config-sqlite.entity';
import { OutputConfigSqlite } from './atis/infrastructure/entity/config/output-config-sqlite.entity';

@Module({
  imports: [
    AtisModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [
        InputConfigSqlite,
        OutputConfigSqlite,
        MessageConfigSqlite,
        TtsConfigSqlite,
        WeatherDataConfigSqlite,
        DailyStatsSqlite,
      ],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
