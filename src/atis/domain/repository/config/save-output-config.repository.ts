import { OutputConfig } from '../../entity/config/output-config.entity';

export interface SaveOutputConfigRepository {
  saveOutputConfig(config: OutputConfig): Promise<void>;
}

export const SAVE_OUTPUT_CONFIG_REPOSITORY = Symbol.for('SaveOutputConfigRepository');
