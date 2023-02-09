import { PorcupineConfig } from '../../valueobject/porcupine-config.vo';

export class InputConfig {
  public constructor(
    public readonly id: number,
    public readonly gpioInputPin?: number,
    public readonly porcupine?: PorcupineConfig,
  ) {}
}
