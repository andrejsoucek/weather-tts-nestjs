import { Inject, Injectable } from '@nestjs/common';
import { PLAYER_SERVICE, PlayerService } from '../service/tts/player.service';

@Injectable()
export class PlaySoundUseCase {
  constructor(@Inject(PLAYER_SERVICE) private readonly player: PlayerService) {}

  async play(file: string): Promise<void> {
    return await this.player.play(file);
  }
}
