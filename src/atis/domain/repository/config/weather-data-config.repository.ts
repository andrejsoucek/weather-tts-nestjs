import { WeatherDataConfig } from '../../entity/config/weather-data-config.entity';

export interface WeatherDataConfigRepository {
  getWeatherDataConfig(): Promise<WeatherDataConfig>;
  saveWeatherDataConfig(): Promise<void>;
}
