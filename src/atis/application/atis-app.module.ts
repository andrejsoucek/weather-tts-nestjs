import { Module } from '@nestjs/common';
import { AtisDomainModule } from '../domain/atis-domain.module';
import { GetConfigHandler } from './handler/get-config.handler';
import { GetTtsLanguagesHandler } from './handler/get-tts-languages.handler';
import { GetCurrentWeatherHandler } from './handler/get-current-weather.handler';
import { SaveConfigHandler } from './handler/save-config.handler';
import { ComposeMessageHandler } from './handler/compose-message.handler';
import { SynthesizeHandler } from './handler/synthesize.handler';
import { PlaySoundHandler } from './handler/play-sound.handler';

@Module({
  imports: [AtisDomainModule],
  providers: [
    GetConfigHandler,
    GetTtsLanguagesHandler,
    GetCurrentWeatherHandler,
    SaveConfigHandler,
    ComposeMessageHandler,
    SynthesizeHandler,
    PlaySoundHandler,
  ],
})
export class AtisAppModule {}
