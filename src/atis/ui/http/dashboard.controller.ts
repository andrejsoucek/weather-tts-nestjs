import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class DashboardController {
  @Get()
  @Render('dashboard/index')
  renderDashboard(): any {
    return {
      messageStats: {
        totalCharacters: 0,
        totalMessages: 0,
        messagesPerDayAvg: 0,
        messagesPerDayMax: 0,
      },
      chartLabels: ['test'],
      chartValues: [3],
    };
  }
}
