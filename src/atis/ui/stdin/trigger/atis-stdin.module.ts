import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TriggerManualService } from '../trigger-manual.service';

@Module({
  providers: [
    TriggerManualService,
    {
      provide: 'StdinTriggerLogger',
      useFactory: () => new Logger('StdinTrigger'),
    },
  ],
  imports: [CqrsModule],
})
export class AtisStdinModule {}
