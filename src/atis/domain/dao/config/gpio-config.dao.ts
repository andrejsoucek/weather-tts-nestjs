import { GpioConfig } from '../../entity/config/gpio-config.entity';

export interface GpioConfigDAO {
  getGpioConfig(): Promise<GpioConfig>;
  saveGpioConfig(): Promise<void>;
}

export const GPIO_CONFIG_DAO = Symbol.for('GpioConfigDAO');
