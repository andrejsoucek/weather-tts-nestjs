import { TtsConfig } from '../../entity/config/tts-config.entity';

export interface SaveTtsConfigRepository {
  saveTTSConfig(config: TtsConfig): Promise<void>;
}

export const SAVE_TTS_CONFIG_REPOSITORY = Symbol.for('SaveTTSConfigRepository');
