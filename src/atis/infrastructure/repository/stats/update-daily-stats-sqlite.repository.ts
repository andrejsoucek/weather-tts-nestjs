import { InjectRepository } from '@nestjs/typeorm';
import { DailyStatsSqlite } from '../../entity/stats/daily-stats-sqlite.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UpdateDailyStatsRepository } from '../../../domain/repository/stats/update-daily-stats.repository';

@Injectable()
export class UpdateDailyStatsSqliteRepository implements UpdateDailyStatsRepository {
  constructor(@InjectRepository(DailyStatsSqlite) private readonly repository: Repository<DailyStatsSqlite>) {}
  async updateDailyStats(message: string): Promise<void> {
    const entity = await this.createEntityForInsert(message);

    await this.repository.save(entity);
  }

  private async createEntityForInsert(message: string): Promise<DailyStatsSqlite> {
    const currentDayTimestamp = UpdateDailyStatsSqliteRepository.getCurrentDayTimestamp();
    const dailyStats = await this.repository.findOne(currentDayTimestamp);
    let messagesCount = 1;
    let charactersCount = message.replace(/<[^>]*>?/gim, '').length;
    if (dailyStats) {
      messagesCount = messagesCount + dailyStats.messagesCount;
      charactersCount = charactersCount + dailyStats.charactersCount;
    }

    const entity = new DailyStatsSqlite();
    entity.dayTimestamp = currentDayTimestamp;
    entity.messagesCount = messagesCount;
    entity.charactersCount = charactersCount;

    return entity;
  }

  private static getCurrentDayTimestamp(): number {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0).valueOf();
  }
}
