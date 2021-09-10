import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTtsLanguagesQuery } from '../query/get-tts-languages.query';
import { GetTtsLanguagesUseCase } from '../../domain/usecase/get-tts-languages.use-case';

@QueryHandler(GetTtsLanguagesQuery)
export class GetTtsLanguagesHandler implements IQueryHandler<GetTtsLanguagesQuery> {
  constructor(private readonly useCase: GetTtsLanguagesUseCase) {}

  async execute(): Promise<string[]> {
    return this.useCase.get();
  }
}
