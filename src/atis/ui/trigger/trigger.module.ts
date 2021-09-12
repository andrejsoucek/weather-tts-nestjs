import { Logger, Module } from '@nestjs/common';
import { TRIGGER_SERVICE } from '../../domain/service/trigger/trigger.service';
import { TriggerManualService } from './stdin/trigger-manual.service';
import { TriggerGpioService } from './gpio/trigger-gpio.service';
import { CqrsModule } from '@nestjs/cqrs';

const triggerProvider = {
  provide: TRIGGER_SERVICE,
  useClass: process.argv.includes('manual') ? TriggerManualService : TriggerGpioService,
};

@Module({
  providers: [
    triggerProvider,
    {
      provide: 'TriggerLogger',
      useFactory: () => new Logger('TriggerService'),
    },
  ],
  imports: [CqrsModule],
})
export class TriggerModule {}
