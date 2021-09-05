import { WeatherDataConfig } from '../../entity/config/weather-data-config.entity';

export interface WeatherDataConfigDAO {
  getWeatherDataConfig(): Promise<WeatherDataConfig>;
  saveWeatherDataConfig(): Promise<void>;
}

export const WEATHER_DATA_CONFIG_DAO = Symbol.for('WeatherConfigDAO');
