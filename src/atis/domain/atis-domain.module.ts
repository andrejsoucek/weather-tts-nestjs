import { Module } from '@nestjs/common';
import { GetConfigUseCase } from './usecase/get-config.use-case';
import { AtisInfrastructureModule } from '../infrastructure/atis-infrastructure.module';

@Module({
  imports: [AtisInfrastructureModule],
  providers: [GetConfigUseCase],
  exports: [GetConfigUseCase],
})
export class AtisDomainModule {}
