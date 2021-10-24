import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TriggerGpioService } from './trigger/trigger-gpio.service';

@Module({
  providers: [
    TriggerGpioService,
    {
      provide: 'GpioTriggerLogger',
      useFactory: () => new Logger('GpioTrigger'),
    },
  ],
  imports: [CqrsModule],
})
export class AtisGpioModule {}
