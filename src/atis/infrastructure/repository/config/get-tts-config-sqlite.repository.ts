import { GetTtsConfigRepository } from '../../../domain/repository/config/get-tts-config.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TtsConfigSqlite } from '../../entity/config/tts-config-sqlite.entity';
import { TtsConfig } from '../../../domain/entity/config/tts-config.entity';

@Injectable()
export class GetTtsConfigSqliteRepository implements GetTtsConfigRepository {
  constructor(@InjectRepository(TtsConfigSqlite) private readonly repository: Repository<TtsConfigSqlite>) {}

  async getTtsConfig(): Promise<TtsConfig> {
    const x = await this.repository.findOneOrFail();
    return new TtsConfig(x.id, x.language);
  }
}
