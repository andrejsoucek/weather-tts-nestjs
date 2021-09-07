import { Config } from '../../../domain/valueobject/config.vo';

export interface SettingsTemplateProperties {
  config: Config;
  languages: string[];
  tzs: string[];
  rwySettings: any /*TODO*/;
  circuitSettings: any /*TODO*/;
}
