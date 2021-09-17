import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PlaySoundCommand } from '../command/play-sound.command';
import { PlaySoundUseCase } from '../../domain/usecase/play-sound.use-case';

@CommandHandler(PlaySoundCommand)
export class PlaySoundHandler implements ICommandHandler<PlaySoundCommand> {
  constructor(private readonly useCase: PlaySoundUseCase) {}

  async execute(command: PlaySoundCommand): Promise<void> {
    return this.useCase.play(command.file);
  }
}
