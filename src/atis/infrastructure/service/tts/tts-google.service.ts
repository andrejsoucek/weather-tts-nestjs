import { TtsService } from '../../../domain/service/tts/tts.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TtsGoogleService implements TtsService {
  getAvailableLanguages(): string[] {
    return [
      'de-DE',
      'en-GB',
      'en-IN',
      'hi-IN',
      'id-ID',
      'ar-XA',
      'cmn-CN',
      'cmn-TW',
      'cs-CZ',
      'da-DK',
      'el-GR',
      'en-AU',
      'en-US',
      'fi-FI',
      'fil-PH',
      'fr-CA',
      'fr-FR',
      'hu-HU',
      'it-IT',
      'ja-JP',
      'ko-KR',
      'nb-NO',
      'nl-NL',
      'pl-PL',
      'pt-BR',
      'pt-PT',
      'ru-RU',
      'sk-SK',
      'sv-SE',
      'tr-TR',
      'uk-UA',
      'vi-VN',
      'es-ES',
      'bn-IN',
      'gu-IN',
      'kn-IN',
      'ml-IN',
      'ta-IN',
      'te-IN',
      'th-TH',
    ];
  }

  textToSpeech(text: string): Promise<string> {
    return Promise.resolve(text);
  }
}
