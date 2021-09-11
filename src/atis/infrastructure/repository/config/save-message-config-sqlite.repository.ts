import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageConfigSqlite } from '../../entity/config/message-config-sqlite.entity';
import { MessageConfig } from '../../../domain/entity/config/message-config.entity';
import { SaveMessageConfigRepository } from '../../../domain/repository/config/save-message-config.repository';

@Injectable()
export class SaveMessageConfigSqliteRepository implements SaveMessageConfigRepository {
  constructor(@InjectRepository(MessageConfigSqlite) private readonly repository: Repository<MessageConfigSqlite>) {}

  async saveMessageConfig(config: MessageConfig): Promise<void> {
    await this.repository.save(config);
  }
}
