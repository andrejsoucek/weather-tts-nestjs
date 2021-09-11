import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCurrentWeatherQuery } from '../query/get-current-weather.query';
import { GetTtsLanguagesQuery } from '../query/get-tts-languages.query';
import { GetCurrentWeatherUseCase } from '../../domain/usecase/get-current-weather.use-case';
import { Weather } from '../../domain/valueobject/weather.vo';

@QueryHandler(GetCurrentWeatherQuery)
export class GetCurrentWeatherHandler implements IQueryHandler<GetTtsLanguagesQuery> {
  constructor(private readonly useCase: GetCurrentWeatherUseCase) {}

  async execute(query: GetCurrentWeatherQuery): Promise<Weather> {
    return this.useCase.get(query.url);
  }
}
