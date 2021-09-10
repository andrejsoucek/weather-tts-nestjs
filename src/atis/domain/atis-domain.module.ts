import { Module } from '@nestjs/common';
import { GetConfigUseCase } from './usecase/get-config.use-case';
import { AtisInfrastructureModule } from '../infrastructure/atis-infrastructure.module';
import { GetTtsLanguagesUseCase } from './usecase/get-tts-languages.use-case';

@Module({
  imports: [AtisInfrastructureModule],
  providers: [GetConfigUseCase, GetTtsLanguagesUseCase],
  exports: [GetConfigUseCase, GetTtsLanguagesUseCase],
})
export class AtisDomainModule {}
