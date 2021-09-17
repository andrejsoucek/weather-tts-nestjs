export interface TtsService {
  getAvailableLanguages(): string[];
  textToSpeech(text: string, language: string, outputFilePath: string): Promise<string>;
}

export const TTS_SERVICE = Symbol.for('TtsService');
