import { Module } from '@nestjs/common';
import { AtisModule } from './atis/atis.module';

@Module({
  imports: [AtisModule],
})
export class AppModule {}
