import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WeatherDataConfigSqlite } from '../../entity/config/weather-data-config-sqlite.entity';
import { WeatherDataConfig } from '../../../domain/entity/config/weather-data-config.entity';
import { SaveWeatherDataConfigRepository } from '../../../domain/repository/config/save-weather-data-config.repository';

@Injectable()
export class SaveWeatherDataConfigSqliteRepository implements SaveWeatherDataConfigRepository {
  constructor(
    @InjectRepository(WeatherDataConfigSqlite) private readonly repository: Repository<WeatherDataConfigSqlite>,
  ) {}

  async saveWeatherDataConfig(config: WeatherDataConfig): Promise<void> {
    await this.repository.save(config);
  }
}
