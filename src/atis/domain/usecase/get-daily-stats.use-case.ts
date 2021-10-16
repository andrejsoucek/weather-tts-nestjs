import { Inject, Injectable } from '@nestjs/common';
import { GET_DAILY_STATS_REPOSITORY, GetDailyStatsRepository } from '../repository/stats/get-daily-stats.repository';
import { DailyStats } from '../entity/stats/daily-stats.entity';

@Injectable()
export class GetDailyStatsUseCase {
  constructor(@Inject(GET_DAILY_STATS_REPOSITORY) private readonly getDailyStatsRepository: GetDailyStatsRepository) {}

  async get(): Promise<DailyStats[]> {
    return await this.getDailyStatsRepository.getDailyStats();
  }
}
