import { GpioConfig } from '../../entity/config/gpio-config.entity';

export interface GetGpioConfigRepository {
  getGpioConfig(): Promise<GpioConfig>;
}

export const GET_GPIO_CONFIG_REPOSITORY = Symbol.for('GetGpioConfigRepository');
