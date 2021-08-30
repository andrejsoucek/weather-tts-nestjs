import { Module } from '@nestjs/common';
import { AtisController } from './http/atis.controller';

@Module({
  imports: [],
  controllers: [AtisController],
})
export class AtisUiModule {}
