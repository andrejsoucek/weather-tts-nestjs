import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyStats } from './entity/daily-stats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DailyStats])],
})
export class AtisInfrastructureModule {}
