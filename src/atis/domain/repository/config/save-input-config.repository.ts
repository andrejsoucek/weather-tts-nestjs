import { InputConfig } from '../../entity/config/input-config.entity';

export interface SaveInputConfigRepository {
  saveInputConfig(config: InputConfig): Promise<void>;
}

export const SAVE_INPUT_CONFIG_REPOSITORY = Symbol.for('SaveInputConfigRepository');
