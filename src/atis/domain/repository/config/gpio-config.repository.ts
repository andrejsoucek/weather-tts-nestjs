import { GpioConfig } from '../../entity/config/gpio-config.entity';

export interface GpioConfigRepository {
  getGpioConfig(): Promise<GpioConfig>;
  saveGpioConfig(): Promise<void>;
}
