import { Module } from '@nestjs/common';
import { DashboardController } from './http/dashboard.controller';
import { SettingsController } from './http/settings.controller';
import { AtisAppModule } from '../application/atis-app.module';

@Module({
  imports: [AtisAppModule],
  controllers: [DashboardController, SettingsController],
})
export class AtisUiModule {}
