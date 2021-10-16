import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDailyStatsQuery } from '../query/get-daily-stats.query';
import { GetDailyStatsUseCase } from '../../domain/usecase/get-daily-stats.use-case';
import { DailyStats } from '../../domain/entity/stats/daily-stats.entity';

@QueryHandler(GetDailyStatsQuery)
export class GetDailyStatsHandler implements IQueryHandler<GetDailyStatsQuery> {
  constructor(private readonly useCase: GetDailyStatsUseCase) {}

  async execute(): Promise<DailyStats[]> {
    return this.useCase.get();
  }
}
