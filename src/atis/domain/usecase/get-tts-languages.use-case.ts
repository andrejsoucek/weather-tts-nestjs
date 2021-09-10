import { Inject, Injectable } from '@nestjs/common';
import { TTS_SERVICE, TtsService } from '../service/tts/tts.service';

@Injectable()
export class GetTtsLanguagesUseCase {
  constructor(@Inject(TTS_SERVICE) private readonly ttsService: TtsService) {}

  get(): string[] {
    return this.ttsService.getAvailableLanguages();
  }
}
