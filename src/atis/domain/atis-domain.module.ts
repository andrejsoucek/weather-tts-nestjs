import { Module } from '@nestjs/common';
import { GetConfigUseCase } from './usecase/get-config.use-case';
import { AtisInfrastructureModule } from '../infrastructure/atis-infrastructure.module';
import { GetTtsLanguagesUseCase } from './usecase/get-tts-languages.use-case';
import { GetCurrentWeatherUseCase } from './usecase/get-current-weather.use-case';
import { SaveConfigUseCase } from './usecase/save-config.use-case';
import moment = require('moment-timezone');
import { ComposeMessageUseCase } from './usecase/compose-message.use-case';
import { MessageService } from './service/message/message.service';

@Module({
  imports: [AtisInfrastructureModule],
  providers: [
    MessageService,
    GetConfigUseCase,
    GetTtsLanguagesUseCase,
    GetCurrentWeatherUseCase,
    SaveConfigUseCase,
    ComposeMessageUseCase,
    {
      provide: 'MomentTimezone',
      useValue: moment.tz,
    },
  ],
  exports: [
    GetConfigUseCase,
    GetTtsLanguagesUseCase,
    GetCurrentWeatherUseCase,
    SaveConfigUseCase,
    GetConfigUseCase,
    ComposeMessageUseCase,
  ],
})
export class AtisDomainModule {}
