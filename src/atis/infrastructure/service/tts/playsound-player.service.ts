import { PlayerService } from '../../../domain/service/tts/player.service';
import { Injectable } from '@nestjs/common';
import * as Player from 'play-sound';

@Injectable()
export class PlaysoundPlayerService implements PlayerService {
  play(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      Player({ player: 'mpg123' }).play(path, (err: Error) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}
