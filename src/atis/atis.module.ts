import { Module } from '@nestjs/common';
import { AtisHttpModule } from './ui/http/atis-http.module';
import { TriggerModule } from './ui/trigger/trigger.module';

@Module({
  imports: [AtisHttpModule, TriggerModule],
})
export class AtisModule {}
