import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { GpioConfigSqlite } from '../../entity/config/gpio-config-sqlite.entity';
import { GpioConfig } from '../../../domain/entity/config/gpio-config.entity';
import { SaveGpioConfigRepository } from '../../../domain/repository/config/save-gpio-config.repository';

@Injectable()
export class SaveGpioConfigSqliteRepository implements SaveGpioConfigRepository {
  constructor(@InjectRepository(GpioConfigSqlite) private readonly repository: Repository<GpioConfigSqlite>) {}

  async saveGpioConfig(config: GpioConfig): Promise<void> {
    await this.repository.save(config);
  }
}
