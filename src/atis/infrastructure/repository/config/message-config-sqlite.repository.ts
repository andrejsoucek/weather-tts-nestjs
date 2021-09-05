import { MessageConfigRepository } from '../../../domain/repository/config/message-config.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageConfigSqlite } from '../../entity/config/message-config-sqlite.entity';
import { MessageConfig } from '../../../domain/entity/config/message-config.entity';

@Injectable()
export class MessageConfigSqliteRepository implements MessageConfigRepository {
  constructor(@InjectRepository(MessageConfigSqlite) private readonly repository: Repository<MessageConfigSqlite>) {}

  async getMessageConfig(): Promise<MessageConfig> {
    const x = await this.repository.findOneOrFail();
    return new MessageConfig(
      x.id,
      x.template,
      x.timezone,
      x.windSpeedUnit,
      x.windBearingUnit,
      x.windCalm,
      x.windGust,
      x.temperatureUnit,
      x.cloudBaseUnit,
      x.rwy,
      x.circuits,
    );
  }

  saveMessageConfig(): Promise<void> {
    return undefined;
  }
}
