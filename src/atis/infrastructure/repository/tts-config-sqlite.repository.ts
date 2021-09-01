import { TTSConfigRepository } from '../../domain/repository/config/tts-config.repository';
import { TTSConfig } from '../../domain/entity/config/tts-config.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TTSConfigSqliteRepository implements TTSConfigRepository {
  constructor(@InjectRepository(TTSConfig) private readonly repository: Repository<TTSConfig>) {}

  getTTSConfig(): Promise<TTSConfig> {
    return undefined;
  }

  saveTTSConfig(): Promise<void> {
    return undefined;
  }
}
