import { DailyStatsRepository } from '../../../domain/repository/stats/daily-stats.repository';
import { DailyStats } from '../../../domain/entity/stats/daily-stats.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyStatsSqlite } from '../../entity/stats/daily-stats-sqlite.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DailyStatsSqliteRepository implements DailyStatsRepository {
  constructor(@InjectRepository(DailyStatsSqlite) private readonly repository: Repository<DailyStatsSqlite>) {}
  async getDailyStats(): Promise<DailyStats[]> {
    const xs = await this.repository.find();
    return xs.map((data) => new DailyStats(data.dayTimestamp, data.messagesCount, data.dayTimestamp));
  }
}