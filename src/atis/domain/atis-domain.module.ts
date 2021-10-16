import { Logger, Module } from '@nestjs/common';
import { GetConfigUseCase } from './usecase/get-config.use-case';
import { AtisInfrastructureModule } from '../infrastructure/atis-infrastructure.module';
import { GetTtsLanguagesUseCase } from './usecase/get-tts-languages.use-case';
import { GetCurrentWeatherUseCase } from './usecase/get-current-weather.use-case';
import { SaveConfigUseCase } from './usecase/save-config.use-case';
import moment = require('moment-timezone');
import { ComposeMessageUseCase } from './usecase/compose-message.use-case';
import { MessageService } from './service/message/message.service';
import { SynthesizeCurrentWeatherUseCase } from './usecase/synthesize-current-weather.use-case';
import { PlaySoundUseCase } from './usecase/play-sound.use-case';
import { GetDailyStatsUseCase } from './usecase/get-daily-stats.use-case';

@Module({
  imports: [AtisInfrastructureModule],
  providers: [
    MessageService,
    GetConfigUseCase,
    GetTtsLanguagesUseCase,
    GetCurrentWeatherUseCase,
    SaveConfigUseCase,
    ComposeMessageUseCase,
    SynthesizeCurrentWeatherUseCase,
    PlaySoundUseCase,
    GetDailyStatsUseCase,
    {
      provide: 'MomentTimezone',
      useValue: moment.tz,
    },
    {
      provide: 'MessageLogger',
      useFactory: () => new Logger('MessageLogger'),
    },
  ],
  exports: [
    GetConfigUseCase,
    GetTtsLanguagesUseCase,
    GetCurrentWeatherUseCase,
    SaveConfigUseCase,
    GetConfigUseCase,
    ComposeMessageUseCase,
    SynthesizeCurrentWeatherUseCase,
    PlaySoundUseCase,
    GetDailyStatsUseCase,
  ],
})
export class AtisDomainModule {}
