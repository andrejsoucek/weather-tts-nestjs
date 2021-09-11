import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard/dashboard.controller';
import { SettingsController } from './settings/settings.controller';
import { AtisAppModule } from '../../application/atis-app.module';
import { CqrsModule } from '@nestjs/cqrs';
import moment = require('moment-timezone');

@Module({
  providers: [
    {
      provide: 'MomentTimezone',
      useValue: moment.tz,
    },
  ],
  imports: [AtisAppModule, CqrsModule],
  controllers: [DashboardController, SettingsController],
})
export class AtisHttpModule {}
