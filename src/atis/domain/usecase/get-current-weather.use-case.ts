import { Inject, Injectable } from '@nestjs/common';
import { WEATHER_PROVIDER, WeatherProvider } from '../service/weather/weather.provider';
import { Weather } from '../valueobject/weather.vo';

@Injectable()
export class GetCurrentWeatherUseCase {
  constructor(@Inject(WEATHER_PROVIDER) private readonly weatherProvider: WeatherProvider) {}

  get(url: string): Promise<Weather> {
    return this.weatherProvider.fetchCurrentWeather(url);
  }
}
