import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TriggerAudioService } from './trigger/trigger-audio.service';

@Module({
  providers: [
    TriggerAudioService,
    {
      provide: 'AudioTriggerLogger',
      useFactory: () => new Logger('AudioTrigger'),
    },
  ],
  imports: [CqrsModule],
})
export class AtisAudioModule {}
