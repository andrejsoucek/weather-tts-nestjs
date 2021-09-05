import { WeatherDataConfigDAO } from '../../../domain/dao/config/weather-data-config.dao';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WeatherDataConfigSqlite } from '../../entity/config/weather-data-config-sqlite.entity';
import { WeatherDataConfig } from '../../../domain/entity/config/weather-data-config.entity';

@Injectable()
export class WeatherDataConfigSqliteDAO implements WeatherDataConfigDAO {
  constructor(
    @InjectRepository(WeatherDataConfigSqlite) private readonly repository: Repository<WeatherDataConfigSqlite>,
  ) {}

  async getWeatherDataConfig(): Promise<WeatherDataConfig> {
    const data = await this.repository.findOneOrFail();
    return new WeatherDataConfig(data.id, data.url);
  }

  saveWeatherDataConfig(): Promise<void> {
    return undefined;
  }
}
