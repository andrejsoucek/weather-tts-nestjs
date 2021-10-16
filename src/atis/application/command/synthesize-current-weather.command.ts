import { Config } from '../../domain/valueobject/config.vo';

export class SynthesizeCurrentWeatherCommand {
  constructor(public readonly config: Config, public readonly outputFilePath: string) {}
}
