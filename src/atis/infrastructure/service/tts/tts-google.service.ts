import { TtsService } from '../../../domain/service/tts/tts.service';
import { Inject, Injectable } from '@nestjs/common';
import * as v1 from '@google-cloud/text-to-speech/build/src/v1';
import { google } from '@google-cloud/text-to-speech/build/protos/protos';
import SynthesizeSpeechRequest = google.cloud.texttospeech.v1.SynthesizeSpeechRequest;
import * as util from 'util';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TtsGoogleService implements TtsService {
  constructor(@Inject('GoogleTTSClient') private readonly ttsClient: v1.TextToSpeechClient) {
    console.log('hi');
    console.log(path.join(process.cwd(), 'auth.json'));
    process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(process.cwd(), 'auth.json');
  }

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

  async textToSpeech(ssml: string, language: string, outputFilePath: string): Promise<string> {
    const request = SynthesizeSpeechRequest.create({
      input: { ssml },
      voice: { languageCode: language },
      audioConfig: { audioEncoding: 'MP3' },
    });
    const response = await this.ttsClient.synthesizeSpeech(request);

    const writeFile = util.promisify(fs.writeFile);
    const audio = response[0];
    if (audio && audio.audioContent) {
      await writeFile(outputFilePath, audio.audioContent, 'binary');
    }

    return outputFilePath;
  }
}
