export interface SaveWeatherDataConfigRepository {
  saveWeatherDataConfig(): Promise<void>;
}

export const SAVE_WEATHER_DATA_CONFIG_REPOSTIORY = Symbol.for('SaveWeatherConfigDAO');
