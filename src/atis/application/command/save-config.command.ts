import { Config } from '../../domain/valueobject/config.vo';

export class SaveConfigCommand {
  constructor(public readonly config: Config) {}
}
