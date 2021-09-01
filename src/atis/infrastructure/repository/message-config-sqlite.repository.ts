import { MessageConfigRepository } from '../../domain/repository/config/message-config.repository';
import { MessageConfig } from '../../domain/entity/config/message-config.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageConfigSqliteRepository implements MessageConfigRepository {
  constructor(@InjectRepository(MessageConfig) private readonly repository: Repository<MessageConfig>) {}

  getMessageConfig(): Promise<MessageConfig> {
    return undefined;
  }

  saveMessageConfig(): Promise<void> {
    return undefined;
  }
}
