import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TriggerStdinService } from './trigger/trigger-stdin.service';

@Module({
  providers: [
    TriggerStdinService,
    {
      provide: 'StdinTriggerLogger',
      useFactory: () => new Logger('StdinTrigger'),
    },
  ],
  imports: [CqrsModule],
})
export class AtisStdinModule {}
