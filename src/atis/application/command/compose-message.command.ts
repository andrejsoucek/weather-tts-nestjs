import { Weather } from '../../domain/valueobject/weather.vo';
import { MessageConfig } from '../../domain/entity/config/message-config.entity';

export class ComposeMessageCommand {
  constructor(public readonly weather: Weather, public readonly config: MessageConfig) {}
}
