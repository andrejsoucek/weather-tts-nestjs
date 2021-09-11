import { Module } from '@nestjs/common';
import { AtisDomainModule } from '../domain/atis-domain.module';
import { GetConfigHandler } from './handler/get-config.handler';
import { GetTtsLanguagesHandler } from './handler/get-tts-languages.handler';
import { GetCurrentWeatherHandler } from './handler/get-current-weather.handler';
import { SaveConfigHandler } from './handler/save-config.handler';

@Module({
  imports: [AtisDomainModule],
  providers: [GetConfigHandler, GetTtsLanguagesHandler, GetCurrentWeatherHandler, SaveConfigHandler],
})
export class AtisAppModule {}
