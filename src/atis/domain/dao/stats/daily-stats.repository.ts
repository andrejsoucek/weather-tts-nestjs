import { DailyStats } from '../../entity/stats/daily-stats.entity';

export interface DailyStatsRepository {
  getDailyStats(): Promise<DailyStats[]>;
}

export const DAILY_STATS_REPOSITORY = Symbol.for('DailyStatsRepository');
