import { PushToTalkService } from '../../../domain/service/ptt/push-to-talk.service';
import { Inject, Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class DirectPushToTalkService implements PushToTalkService {
  constructor(@Inject('InfrastructureLogger') private readonly logger: LoggerService) {
    logger.debug('Direct PTT service created');
  }

  startTransmission(): void {
    this.logger.debug('DirectPushToTalkService.startTransmission()');
  }
  stopTransmission(): void {
    this.logger.debug('DirectPushToTalkService.stopTransmission()');
  }
}
