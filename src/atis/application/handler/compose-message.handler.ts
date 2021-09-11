import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ComposeMessageUseCase } from '../../domain/usecase/compose-message.use-case';
import { ComposeMessageCommand } from '../command/compose-message.command';

@CommandHandler(ComposeMessageCommand)
export class ComposeMessageHandler implements ICommandHandler<ComposeMessageCommand> {
  constructor(private readonly useCase: ComposeMessageUseCase) {}

  async execute(command: ComposeMessageCommand): Promise<string> {
    return this.useCase.compose(command.weather, command.config);
  }
}
