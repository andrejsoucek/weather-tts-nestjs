import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SaveConfigCommand } from '../command/save-config.command';
import { SaveConfigUseCase } from '../../domain/usecase/save-config.use-case';

@CommandHandler(SaveConfigCommand)
export class SaveConfigHandler implements ICommandHandler<SaveConfigCommand> {
  constructor(private readonly useCase: SaveConfigUseCase) {}

  async execute(command: SaveConfigCommand): Promise<void> {
    return this.useCase.save(command.config);
  }
}
