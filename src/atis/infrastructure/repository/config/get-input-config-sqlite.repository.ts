import { GetInputConfigRepository } from '../../../domain/repository/config/get-input-config.repository';
import { Injectable } from '@nestjs/common';
import { InputConfig } from '../../../domain/entity/config/input-config.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InputConfigSqlite } from '../../entity/config/input-config-sqlite.entity';
import { Repository } from 'typeorm';
import { PorcupineConfig } from '../../../domain/valueobject/porcupine-config.vo';

@Injectable()
export class GetInputConfigSqliteRepository implements GetInputConfigRepository {
  constructor(@InjectRepository(InputConfigSqlite) private readonly repository: Repository<InputConfigSqlite>) {}
  async getInputConfig(): Promise<InputConfig> {
    const x = await this.repository.findOneOrFail();

    return new InputConfig(
      x.id,
      x.gpioInputPin,
      x.porcupineAccessKey && x.ppnFilePath && x.sensitivity && x.device
        ? new PorcupineConfig(x.porcupineAccessKey, x.ppnFilePath, x.sensitivity, x.device)
        : new PorcupineConfig('', '', 0.65, ''),
    );
  }
}
