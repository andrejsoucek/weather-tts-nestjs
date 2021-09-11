import { Weather } from '../../valueobject/weather.vo';

export interface WeatherProvider {
  fetchCurrentWeather(url: string): Promise<Weather>;
}

export const WEATHER_PROVIDER = Symbol.for('WeatherProvider');
