import { Inject } from '@nestjs/common';
import { PLAYER_SERVICE, PlayerService } from '../service/tts/player.service';
import { PUSH_TO_TALK_SERVICE, PushToTalkService } from '../service/ptt/push-to-talk.service';
import { OutputConfig } from '../entity/config/output-config.entity';

export class TransmitMessageUseCase {
  constructor(
    @Inject(PLAYER_SERVICE) private readonly player: PlayerService,
    @Inject(PUSH_TO_TALK_SERVICE) private readonly ptt: PushToTalkService,
  ) {}

  async transmit(file: string, config: OutputConfig): Promise<void> {
    this.ptt.startTransmission(config);
    await this.player.play(file);
    this.ptt.stopTransmission();
  }
}
