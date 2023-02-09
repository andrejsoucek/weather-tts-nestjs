import { OutputConfig } from '../../entity/config/output-config.entity';

export interface PushToTalkService {
  startTransmission(cfg: OutputConfig): void;
  stopTransmission(): void;
}

export const PUSH_TO_TALK_SERVICE = Symbol.for('PushToTalkService');
