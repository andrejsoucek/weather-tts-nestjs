import { GetDailyStatsRepository } from '../../../domain/repository/stats/get-daily-stats.repository';
import { DailyStats } from '../../../domain/entity/stats/daily-stats.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyStatsSqlite } from '../../entity/stats/daily-stats-sqlite.entity';
import { MoreThan, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetDailyStatsSqliteRepository implements GetDailyStatsRepository {
  constructor(@InjectRepository(DailyStatsSqlite) private readonly repository: Repository<DailyStatsSqlite>) {}
  async getDailyStats(): Promise<DailyStats[]> {
    const currentDate = new Date();
    const firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0);
    const xs = await this.repository.find({ where: { dayTimestamp: MoreThan(firstDayOfCurrentMonth.valueOf()) } });

    return xs.map((data) => new DailyStats(data.dayTimestamp, data.messagesCount, data.charactersCount));
  }
}
