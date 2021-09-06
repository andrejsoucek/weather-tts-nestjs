import { GetWeatherDataConfigRepository } from '../../../domain/repository/config/get-weather-data-config.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WeatherDataConfigSqlite } from '../../entity/config/weather-data-config-sqlite.entity';
import { WeatherDataConfig } from '../../../domain/entity/config/weather-data-config.entity';

@Injectable()
export class GetWeatherDataConfigSqliteRepository implements GetWeatherDataConfigRepository {
  constructor(
    @InjectRepository(WeatherDataConfigSqlite) private readonly repository: Repository<WeatherDataConfigSqlite>,
  ) {}

  async getWeatherDataConfig(): Promise<WeatherDataConfig> {
    const data = await this.repository.findOneOrFail();
    return new WeatherDataConfig(data.id, data.url);
  }
}
