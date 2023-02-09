import { PlayerService } from '../../../domain/service/tts/player.service';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import * as Player from 'play-sound';

@Injectable()
export class PlaysoundPlayerService implements PlayerService {
  constructor(@Inject('InfrastructureLogger') private readonly logger: LoggerService) {}
  play(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.logger.debug('Play sound: ' + path);
      Player({ player: 'mpg123' }).play(path, (err: Error) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}
