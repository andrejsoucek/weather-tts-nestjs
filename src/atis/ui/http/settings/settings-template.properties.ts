import { Config } from '../../../domain/valueobject/config.vo';
import { SelectOption } from '../select-option.interface';
import { TextCondition } from '../../../domain/valueobject/text-condition.vo';

export interface SettingsTemplateProperties {
  config: Config;
  languagesOptions: SelectOption[];
  tzs: string[];
  rwySettings: Array<TextCondition & { options: SelectOption[] }>;
  circuitSettings: Array<TextCondition & { options: SelectOption[] }>;
}
