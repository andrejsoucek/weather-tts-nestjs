import { Module } from '@nestjs/common';
import { AtisUiModule } from './ui/atis-ui.module';

@Module({
  imports: [AtisUiModule],
})
export class AtisModule {}
