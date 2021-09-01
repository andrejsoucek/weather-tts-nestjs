import { MessageConfig } from '../../entity/config/message-config.entity';

export interface MessageConfigRepository {
  getMessageConfig(): Promise<MessageConfig>;
  saveMessageConfig(): Promise<void>;
}
