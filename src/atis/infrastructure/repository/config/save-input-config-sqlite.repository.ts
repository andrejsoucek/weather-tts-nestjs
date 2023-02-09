import { InjectRepository } from '@nestjs/typeorm';
import { InputConfigSqlite } from '../../entity/config/input-config-sqlite.entity';
import { SaveInputConfigRepository } from '../../../domain/repository/config/save-input-config.repository';
import { Repository } from 'typeorm';
import { InputConfig } from '../../../domain/entity/config/input-config.entity';

export class SaveInputConfigSqliteRepository implements SaveInputConfigRepository {
  constructor(@InjectRepository(InputConfigSqlite) private readonly repository: Repository<InputConfigSqlite>) {}

  async saveInputConfig(config: InputConfig): Promise<void> {
    const x = new InputConfigSqlite();
    x.id = config.id;
    if (config.gpioInputPin) {
      x.gpioInputPin = config.gpioInputPin;
    }
    if (config.porcupine) {
      x.porcupineAccessKey = config.porcupine.accessKey;
      x.ppnFilePath = config.porcupine.ppnFilePath;
      x.sensitivity = config.porcupine.sensitivity;
      x.device = config.porcupine.device;
    }
    await this.repository.save(x);
  }
}
