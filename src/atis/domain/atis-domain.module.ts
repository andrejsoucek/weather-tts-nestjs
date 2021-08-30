import { Module } from '@nestjs/common';
import { AtisInfrastructureModule } from '../infrastructure/atis-infrastructure.module';

@Module({
  imports: [AtisInfrastructureModule],
})
export class AtisDomainModule {}
