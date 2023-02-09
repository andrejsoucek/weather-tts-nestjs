import { WeatherDataConfig } from '../../entity/config/weather-data-config.entity';

export interface GetWeatherDataConfigRepository {
  getWeatherDataConfig(): Promise<WeatherDataConfig>;
}

export const GET_WEATHER_DATA_CONFIG_REPOSITORY = Symbol.for('GetWeatherConfigDAO');
