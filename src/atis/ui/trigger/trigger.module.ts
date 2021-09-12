import { Module } from '@nestjs/common';
import { TRIGGER_SERVICE } from '../../domain/service/trigger/trigger.service';
import { TriggerManualService } from './stdin/trigger-manual.service';
import { TriggerGpioService } from './gpio/trigger-gpio.service';
import { CqrsModule } from '@nestjs/cqrs';

const triggerProvider = {
  provide: TRIGGER_SERVICE,
  useClass: process.argv.includes('manual') ? TriggerManualService : TriggerGpioService,
};

@Module({
  providers: [triggerProvider],
  imports: [CqrsModule],
})
export class TriggerModule {}
