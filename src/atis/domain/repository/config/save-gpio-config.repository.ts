export interface SaveGpioConfigRepository {
  saveGpioConfig(): Promise<void>;
}

export const SAVE_GPIO_CONFIG_REPOSITORY = Symbol.for('SaveGpioConfigRepository');
