import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetConfigQuery } from '../query/get-config.query';
import { GetConfigUseCase } from '../../domain/usecase/get-config.use-case';
import { Config } from '../../domain/valueobject/config.vo';

@QueryHandler(GetConfigQuery)
export class GetConfigHandler implements IQueryHandler<GetConfigQuery> {
  constructor(private readonly useCase: GetConfigUseCase) {}

  async execute(): Promise<Config> {
    return this.useCase.get();
  }
}
