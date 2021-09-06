export interface SaveTtsConfigRepository {
  saveTTSConfig(): Promise<void>;
}

export const SAVE_TTS_CONFIG_REPOSITORY = Symbol.for('SaveTTSConfigRepository');
