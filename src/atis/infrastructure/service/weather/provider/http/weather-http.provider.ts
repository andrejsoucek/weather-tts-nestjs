import { WeatherProvider } from '../../../../../domain/service/weather/weather.provider';
import { Inject, Injectable } from '@nestjs/common';
import { Weather } from '../../../../../domain/valueobject/weather.vo';
import { HttpService } from '@nestjs/axios';
import { WEATHER_PARSER, WeatherParser } from '../../../../../domain/service/weather/weather.parser';
import { firstValueFrom } from 'rxjs';
import { WeatherNotFoundException } from '../../../../../domain/exception/weather-not-found.exception';

@Injectable()
export class WeatherHttpProvider implements WeatherProvider {
  constructor(
    private readonly httpService: HttpService,
    @Inject(WEATHER_PARSER) private readonly weatherParser: WeatherParser,
  ) {}

  async fetchCurrentWeather(url: string): Promise<Weather> {
    try {
      const response = await firstValueFrom(this.httpService.get<string>(url));

      return this.weatherParser.parse(response.data);
    } catch (e) {
      if (e.isAxiosError && e.code && e.code === 'ENOTFOUND') {
        throw WeatherNotFoundException.createWithUrl(e.config.url);
      }
      if (e.isAxiosError && e.response.status && e.response.status === 404) {
        throw WeatherNotFoundException.createWithUrl(e.response.config.url);
      }
      throw e;
    }
  }
}
