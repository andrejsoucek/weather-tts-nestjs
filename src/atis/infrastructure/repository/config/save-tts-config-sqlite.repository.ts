import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TtsConfigSqlite } from '../../entity/config/tts-config-sqlite.entity';
import { TtsConfig } from '../../../domain/entity/config/tts-config.entity';
import { SaveTtsConfigRepository } from '../../../domain/repository/config/save-tts-config.repository';

@Injectable()
export class SaveTtsConfigSqliteRepository implements SaveTtsConfigRepository {
  constructor(@InjectRepository(TtsConfigSqlite) private readonly repository: Repository<TtsConfigSqlite>) {}

  async saveTTSConfig(config: TtsConfig): Promise<void> {
    await this.repository.save(config);
  }
}
