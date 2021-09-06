import { TtsConfig } from '../../entity/config/tts-config.entity';

export interface GetTtsConfigRepository {
  getTtsConfig(): Promise<TtsConfig>;
}

export const GET_TTS_CONFIG_REPOSITORY = Symbol.for('GetTTSConfigRepository');
