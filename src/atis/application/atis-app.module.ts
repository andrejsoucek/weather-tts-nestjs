import { Module } from '@nestjs/common';
import { AtisDomainModule } from '../domain/atis-domain.module';
import { AtisInfrastructureModule } from '../infrastructure/atis-infrastructure.module';

@Module({
  imports: [AtisDomainModule, AtisInfrastructureModule],
})
export class AtisAppModule {}
