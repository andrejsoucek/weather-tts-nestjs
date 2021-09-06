import { GetGpioConfigRepository } from '../../../domain/repository/config/get-gpio-config.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { GpioConfigSqlite } from '../../entity/config/gpio-config-sqlite.entity';
import { GpioConfig } from '../../../domain/entity/config/gpio-config.entity';

@Injectable()
export class GetGpioConfigSqliteRepository implements GetGpioConfigRepository {
  constructor(@InjectRepository(GpioConfigSqlite) private readonly repository: Repository<GpioConfigSqlite>) {}

  async getGpioConfig(): Promise<GpioConfig> {
    const x = await this.repository.findOneOrFail();
    return new GpioConfig(x.id, x.input, x.output);
  }
}
