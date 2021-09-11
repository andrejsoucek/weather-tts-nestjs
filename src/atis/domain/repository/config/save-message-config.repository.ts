import { MessageConfig } from '../../entity/config/message-config.entity';

export interface SaveMessageConfigRepository {
  saveMessageConfig(config: MessageConfig): Promise<void>;
}

export const SAVE_MESSAGE_CONFIG_REPOSITORY = Symbol.for('SaveMessageConfigRepository');
