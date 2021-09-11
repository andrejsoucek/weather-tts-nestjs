import { Module } from '@nestjs/common';
import { AtisDomainModule } from '../domain/atis-domain.module';
import { GetConfigHandler } from './handler/get-config.handler';
import { GetTtsLanguagesHandler } from './handler/get-tts-languages.handler';
import { GetCurrentWeatherHandler } from './handler/get-current-weather.handler';

@Module({
  imports: [AtisDomainModule],
  providers: [GetConfigHandler, GetTtsLanguagesHandler, GetCurrentWeatherHandler],
})
export class AtisAppModule {}
