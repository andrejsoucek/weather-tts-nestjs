import { GpioConfig } from '../../entity/config/gpio-config.entity';

export interface SaveGpioConfigRepository {
  saveGpioConfig(config: GpioConfig): Promise<void>;
}

export const SAVE_GPIO_CONFIG_REPOSITORY = Symbol.for('SaveGpioConfigRepository');
