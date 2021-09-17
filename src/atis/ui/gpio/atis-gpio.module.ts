import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  providers: [
    {
      provide: 'GpioTriggerLogger',
      useFactory: () => new Logger('GpioTrigger'),
    },
  ],
  imports: [CqrsModule],
})
export class AtisGpioModule {}
