export interface PlayerService {
  play(path: string): Promise<void>;
}

export const PLAYER_SERVICE = Symbol.for('PlayerService');
