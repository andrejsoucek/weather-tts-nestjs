import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SynthesizeCommand } from '../command/synthesize.command';
import { SynthesizeUseCase } from '../../domain/usecase/synthesize.use-case';

@CommandHandler(SynthesizeCommand)
export class SynthesizeHandler implements ICommandHandler<SynthesizeCommand> {
  constructor(private readonly useCase: SynthesizeUseCase) {}

  async execute(command: SynthesizeCommand): Promise<string> {
    return this.useCase.synthesize(command.message, command.language, command.fileOutputPath);
  }
}
