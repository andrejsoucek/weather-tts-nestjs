import { WeatherDataConfigRepository } from '../../domain/repository/config/weather-data-config.repository';
import { WeatherDataConfig } from '../../domain/entity/config/weather-data-config.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class WeatherDataConfigSqliteRepository implements WeatherDataConfigRepository {
  constructor(@InjectRepository(WeatherDataConfig) private readonly repository: Repository<WeatherDataConfig>) {}
  getWeatherDataConfig(): Promise<WeatherDataConfig> {
    return undefined;
  }

  saveWeatherDataConfig(): Promise<void> {
    return undefined;
  }
}
