import { OutputConfig } from '../../entity/config/output-config.entity';

export interface GetOutputConfigRepository {
  getOutputConfig(): Promise<OutputConfig>;
}

export const GET_OUTPUT_CONFIG_REPOSITORY = Symbol.for('OutputConfigRepository');
