import { Module } from '@nestjs/common';
import { GetConfigUseCase } from './usecase/get-config.use-case';
import { AtisInfrastructureModule } from '../infrastructure/atis-infrastructure.module';
import { GetTtsLanguagesUseCase } from './usecase/get-tts-languages.use-case';
import { GetCurrentWeatherUseCase } from './usecase/get-current-weather.use-case';
import { SaveConfigUseCase } from './usecase/save-config.use-case';

@Module({
  imports: [AtisInfrastructureModule],
  providers: [GetConfigUseCase, GetTtsLanguagesUseCase, GetCurrentWeatherUseCase, SaveConfigUseCase],
  exports: [GetConfigUseCase, GetTtsLanguagesUseCase, GetCurrentWeatherUseCase, SaveConfigUseCase],
})
export class AtisDomainModule {}
