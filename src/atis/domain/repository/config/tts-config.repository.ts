import { TTSConfig } from '../../entity/config/tts-config.entity';

export interface TTSConfigRepository {
  getTTSConfig(): Promise<TTSConfig>;
  saveTTSConfig(): Promise<void>;
}
