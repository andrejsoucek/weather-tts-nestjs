import { Module } from '@nestjs/common';
import { DashboardController } from './http/dashboard.controller';
import { SettingsController } from './http/settings.controller';

@Module({
  imports: [],
  controllers: [DashboardController, SettingsController],
})
export class AtisUiModule {}
