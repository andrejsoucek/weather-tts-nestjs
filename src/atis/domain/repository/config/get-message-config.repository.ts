import { MessageConfig } from '../../entity/config/message-config.entity';

export interface GetMessageConfigRepository {
  getMessageConfig(): Promise<MessageConfig>;
}

export const GET_MESSAGE_CONFIG_REPOSITORY = Symbol.for('GetMessageConfigRepository');
