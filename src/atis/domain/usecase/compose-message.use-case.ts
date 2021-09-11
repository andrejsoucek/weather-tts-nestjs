import { Injectable } from '@nestjs/common';
import { MessageService } from '../service/message/message.service';
import { MessageConfig } from '../entity/config/message-config.entity';
import { Weather } from '../valueobject/weather.vo';

@Injectable()
export class ComposeMessageUseCase {
  constructor(private readonly messageService: MessageService) {}

  compose(weather: Weather, config: MessageConfig): string {
    return this.messageService.composeMessage(weather, config);
  }
}
