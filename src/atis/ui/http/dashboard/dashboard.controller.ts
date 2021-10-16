import { Controller, Get, Render } from '@nestjs/common';
import { DashboardTemplateProperties } from './dashboard.template-properties';
import { QueryBus } from '@nestjs/cqrs';
import { GetDailyStatsQuery } from '../../../application/query/get-daily-stats.query';
import { DailyStats } from '../../../domain/entity/stats/daily-stats.entity';

@Controller()
export class DashboardController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @Render('dashboard/index')
  async renderDashboard(): Promise<DashboardTemplateProperties> {
    const dailyStats = await this.queryBus.execute<GetDailyStatsQuery, DailyStats[]>(new GetDailyStatsQuery());

    return DashboardController.computeStats(dailyStats);
  }

  private static computeStats(dailyStats: DailyStats[]): DashboardTemplateProperties {
    let totalCharacters = 0;
    let totalMessages = 0;
    let messagesPerDayMax = 0;
    const chartLabels = [];
    const chartValues = [];
    dailyStats.forEach((v) => {
      totalCharacters = totalCharacters + v.charactersCount;
      totalMessages = totalMessages + v.messagesCount;
      if (messagesPerDayMax < v.messagesCount) {
        messagesPerDayMax = v.messagesCount;
      }
      chartLabels.push(new Date(v.dayTimestamp).toLocaleDateString());
      chartValues.push(v.messagesCount);
    });
    const messagesPerDayAvg = dailyStats.length > 0 ? totalMessages / dailyStats.length : 0;

    return {
      messageStats: {
        totalCharacters,
        totalMessages,
        messagesPerDayAvg,
        messagesPerDayMax,
      },
      chartLabels,
      chartValues,
    };
  }
}
