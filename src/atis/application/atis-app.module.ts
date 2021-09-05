import { Module } from '@nestjs/common';
import { AtisDomainModule } from '../domain/atis-domain.module';
import { GetConfigHandler } from './handler/get-config.handler';

@Module({
  imports: [AtisDomainModule],
  providers: [GetConfigHandler],
})
export class AtisAppModule {}
