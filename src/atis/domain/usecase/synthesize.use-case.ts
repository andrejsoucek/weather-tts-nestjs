import { Inject, Injectable } from '@nestjs/common';
import { TTS_SERVICE, TtsService } from '../service/tts/tts.service';

@Injectable()
export class SynthesizeUseCase {
  constructor(@Inject(TTS_SERVICE) private readonly ttsService: TtsService) {}

  async synthesize(text: string, language: string, outputFilePath: string): Promise<string> {
    return await this.ttsService.textToSpeech(text, language, outputFilePath);
  }
}
