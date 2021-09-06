export interface SaveMessageConfigRepository {
  saveMessageConfig(): Promise<void>;
}

export const SAVE_MESSAGE_CONFIG_REPOSITORY = Symbol.for('SaveMessageConfigRepository');
