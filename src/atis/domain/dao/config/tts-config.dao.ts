import { TTSConfig } from '../../entity/config/tts-config.entity';

export interface TTSConfigDAO {
  getTTSConfig(): Promise<TTSConfig>;
  saveTTSConfig(): Promise<void>;
}

export const TTS_CONFIG_DAO = Symbol.for('TTSConfigDAO');
