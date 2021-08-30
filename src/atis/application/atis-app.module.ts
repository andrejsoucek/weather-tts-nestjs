import { Module } from '@nestjs/common';
import { AtisDomainModule } from '../domain/atis-domain.module';

@Module({
  imports: [AtisDomainModule],
})
export class AtisAppModule {}
