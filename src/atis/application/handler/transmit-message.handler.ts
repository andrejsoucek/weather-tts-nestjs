import { TransmitMessageCommand } from '../command/transmit-message.command';
import { CommandHandler } from '@nestjs/cqrs';
import { TransmitMessageUseCase } from '../../domain/usecase/transmit-message.use-case';

@CommandHandler(TransmitMessageCommand)
export class TransmitMessageHandler {
  constructor(private readonly transmitMessageUseCase: TransmitMessageUseCase) {}

  async execute(command: TransmitMessageCommand): Promise<void> {
    return this.transmitMessageUseCase.transmit(command.file, command.config);
  }
}
