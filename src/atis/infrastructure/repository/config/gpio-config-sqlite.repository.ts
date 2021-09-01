import { GpioConfigRepository } from '../../../domain/repository/config/gpio-config.repository';
import { GpioConfig } from '../../../domain/entity/config/gpio-config.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GpioConfigSqliteRepository implements GpioConfigRepository {
  constructor(@InjectRepository(GpioConfig) private readonly repository: Repository<GpioConfig>) {}

  getGpioConfig(): Promise<GpioConfig> {
    return this.repository.findOne();
  }

  saveGpioConfig(): Promise<void> {
    return undefined;
  }
}
