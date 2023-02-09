import { OutputConfig } from '../../domain/entity/config/output-config.entity';

export class TransmitMessageCommand {
  constructor(public readonly file: string, public readonly config: OutputConfig) {}
}
