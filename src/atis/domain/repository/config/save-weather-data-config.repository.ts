import { WeatherDataConfig } from '../../entity/config/weather-data-config.entity';

export interface SaveWeatherDataConfigRepository {
  saveWeatherDataConfig(config: WeatherDataConfig): Promise<void>;
}

export const SAVE_WEATHER_DATA_CONFIG_REPOSTIORY = Symbol.for('SaveWeatherConfigDAO');
