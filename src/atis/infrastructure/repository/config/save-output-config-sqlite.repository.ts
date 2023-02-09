import { OutputConfig } from '../../../domain/entity/config/output-config.entity';
import { OutputConfigSqlite } from '../../entity/config/output-config-sqlite.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveOutputConfigRepository } from '../../../domain/repository/config/save-output-config.repository';

export class SaveOutputConfigSqliteRepository implements SaveOutputConfigRepository {
  constructor(@InjectRepository(OutputConfigSqlite) private readonly repository: Repository<OutputConfigSqlite>) {}

  async saveOutputConfig(config: OutputConfig): Promise<void> {
    const x = new OutputConfigSqlite();
    x.id = config.id;
    x.gpioOutputPin = config.gpioOutputPin;

    await this.repository.save(x);
  }
}
