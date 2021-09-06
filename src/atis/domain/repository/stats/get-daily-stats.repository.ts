import { DailyStats } from '../../entity/stats/daily-stats.entity';

export interface GetDailyStatsRepository {
  getDailyStats(): Promise<DailyStats[]>;
}

export const GET_DAILY_STATS_REPOSITORY = Symbol.for('GetDailyStatsRepository');
