import { GpioConfigDAO } from '../../../domain/dao/config/gpio-config.dao';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { GpioConfigSqlite } from '../../entity/config/gpio-config-sqlite.entity';
import { GpioConfig } from '../../../domain/entity/config/gpio-config.entity';

@Injectable()
export class GpioConfigSqliteDAO implements GpioConfigDAO {
  constructor(@InjectRepository(GpioConfigSqlite) private readonly repository: Repository<GpioConfigSqlite>) {}

  async getGpioConfig(): Promise<GpioConfig> {
    const x = await this.repository.findOneOrFail();
    return new GpioConfig(x.id, x.input, x.output);
  }

  saveGpioConfig(): Promise<void> {
    return undefined;
  }
}
