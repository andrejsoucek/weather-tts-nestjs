import { DailyStats } from '../../entity/stats/daily-stats.entity';

export interface DailyStatsRepository {
  getDailyStats(): Promise<DailyStats[]>;
}
