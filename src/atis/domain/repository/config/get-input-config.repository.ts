import { InputConfig } from '../../entity/config/input-config.entity';

export interface GetInputConfigRepository {
  getInputConfig(): Promise<InputConfig>;
}

export const GET_INPUT_CONFIG_REPOSITORY = Symbol.for('InputConfigRepository');
