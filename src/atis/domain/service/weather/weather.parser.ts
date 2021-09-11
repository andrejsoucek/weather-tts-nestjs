import { Weather } from '../../valueobject/weather.vo';

export interface WeatherParser {
  parse(s: string): Weather;
}

export const WEATHER_PARSER = Symbol.for('WeatherParser');
