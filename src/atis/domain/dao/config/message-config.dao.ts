import { MessageConfig } from '../../entity/config/message-config.entity';

export interface MessageConfigDAO {
  getMessageConfig(): Promise<MessageConfig>;
  saveMessageConfig(): Promise<void>;
}

export const MESSAGE_CONFIG_DAO = Symbol.for('MessageConfigDAO');
