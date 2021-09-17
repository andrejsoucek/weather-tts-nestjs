import { PlayerService } from '../../../domain/service/tts/player.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlaysoundPlayerService implements PlayerService {
  play(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      require('play-sound')({ player: 'mpg123' }).play(path, (err: Error) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}
