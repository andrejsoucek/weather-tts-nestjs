import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SynthesizeCurrentWeatherCommand } from '../command/synthesize-current-weather.command';
import { SynthesizeCurrentWeatherUseCase } from '../../domain/usecase/synthesize-current-weather.use-case';

@CommandHandler(SynthesizeCurrentWeatherCommand)
export class SynthesizeCurrentWeatherHandler implements ICommandHandler<SynthesizeCurrentWeatherCommand> {
  constructor(private readonly useCase: SynthesizeCurrentWeatherUseCase) {}

  async execute(command: SynthesizeCurrentWeatherCommand): Promise<string> {
    return this.useCase.synthesize(command.config, command.outputFilePath);
  }
}
