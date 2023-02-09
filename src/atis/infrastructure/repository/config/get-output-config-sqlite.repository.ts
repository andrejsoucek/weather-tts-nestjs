import { GetOutputConfigRepository } from '../../../domain/repository/config/get-output-config.repository';
import { Injectable } from '@nestjs/common';
import { OutputConfig } from '../../../domain/entity/config/output-config.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OutputConfigSqlite } from '../../entity/config/output-config-sqlite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetOutputConfigSqliteRepository implements GetOutputConfigRepository {
  constructor(@InjectRepository(OutputConfigSqlite) private readonly repository: Repository<OutputConfigSqlite>) {}
  async getOutputConfig(): Promise<OutputConfig> {
    const x = await this.repository.findOneOrFail();

    return new OutputConfig(x.id, x.gpioOutputPin);
  }
}
