import { Config } from '../../../domain/valueobject/config.vo';
import { SelectOption } from '../select-option.interface';
import { RunwayCondition } from '../../../domain/valueobject/runway-condition.vo';
import { CircuitCondition } from '../../../domain/valueobject/circuit-condition.vo';

export interface SettingsTemplateProperties {
  config: Config;
  languagesOptions: SelectOption[];
  tzs: string[];
  rwySettings: Array<RunwayCondition & { options: SelectOption[] }>;
  circuitSettings: Array<CircuitCondition & { options: SelectOption[] }>;
}
