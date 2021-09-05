import { MessageConfigDAO } from '../../../domain/dao/config/message-config.dao';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageConfigSqlite } from '../../entity/config/message-config-sqlite.entity';
import { MessageConfig } from '../../../domain/entity/config/message-config.entity';
import { TextCondition } from '../../../domain/valueobject/text-condition.vo';

@Injectable()
export class MessageConfigSqliteDAO implements MessageConfigDAO {
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
      MessageConfigSqliteDAO.mapConditionsFromString(x.rwy),
      MessageConfigSqliteDAO.mapConditionsFromString(x.circuits),
    );
  }

  private static mapConditionsFromString(s: string): TextCondition[] {
    return JSON.parse(s) as TextCondition[];
  }

  saveMessageConfig(): Promise<void> {
    return undefined;
  }
}
