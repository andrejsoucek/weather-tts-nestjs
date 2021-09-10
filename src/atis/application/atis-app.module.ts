import { Module } from '@nestjs/common';
import { AtisDomainModule } from '../domain/atis-domain.module';
import { GetConfigHandler } from './handler/get-config.handler';
import { GetTtsLanguagesHandler } from './handler/get-tts-languages.handler';

@Module({
  imports: [AtisDomainModule],
  providers: [GetConfigHandler, GetTtsLanguagesHandler],
})
export class AtisAppModule {}
