import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { SettingsController } from './settings.controller';
import { AtisAppModule } from '../../application/atis-app.module';

@Module({
  imports: [AtisAppModule],
  controllers: [DashboardController, SettingsController],
})
export class AtisHttpModule {}
