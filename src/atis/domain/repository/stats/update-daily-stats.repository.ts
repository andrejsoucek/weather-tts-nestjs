export interface UpdateDailyStatsRepository {
  updateDailyStats(message: string): Promise<void>;
}

export const UPDATE_DAILY_STATS_REPOSITORY = Symbol.for('UpdateDailyStatsRepository');
