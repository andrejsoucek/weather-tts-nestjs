import { Module } from '@nestjs/common';
import { AtisController } from './ui/http/atis.controller';
import { AtisUiModule } from './ui/atis-ui.module';

@Module({
  imports: [AtisUiModule],
  controllers: [AtisController],
})
export class AtisModule {}
