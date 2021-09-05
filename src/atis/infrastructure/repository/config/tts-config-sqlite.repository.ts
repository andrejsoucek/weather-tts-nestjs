import { TTSConfigRepository } from '../../../domain/repository/config/tts-config.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TTSConfigSqlite } from '../../entity/config/tts-config-sqlite.entity';
import { TTSConfig } from '../../../domain/entity/config/tts-config.entity';

@Injectable()
export class TTSConfigSqliteRepository implements TTSConfigRepository {
  constructor(@InjectRepository(TTSConfigSqlite) private readonly repository: Repository<TTSConfigSqlite>) {}

  async getTTSConfig(): Promise<TTSConfig> {
    const x = await this.repository.findOneOrFail();
    return new TTSConfig(x.id, x.language);
  }

  saveTTSConfig(): Promise<void> {
    return undefined;
  }
}
