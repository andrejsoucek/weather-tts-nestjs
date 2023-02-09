import { Inject, Injectable, Logger, LoggerService, OnApplicationShutdown } from '@nestjs/common';
import { PushToTalkService } from '../../../domain/service/ptt/push-to-talk.service';
import { Gpio } from 'onoff';
import { OutputConfig } from '../../../domain/entity/config/output-config.entity';

@Injectable()
export class GpioPushToTalkService implements PushToTalkService, OnApplicationShutdown {
  private gpioOutput?: Gpio;
  constructor(@Inject('InfrastructureLogger') private readonly logger: LoggerService) {
    logger.debug('GPIO PTT service created');
  }

  startTransmission(config: OutputConfig): void {
    this.gpioOutput = new Gpio(config.gpioOutputPin, 'out', 'none', { debounceTimeout: 10 });
    this.gpioOutput.writeSync(Gpio.HIGH);
    this.logger.debug(`PTT start: GPIO value: ${this.gpioOutput.readSync()}`);
  }

  stopTransmission(): void {
    this.gpioOutput?.writeSync(Gpio.LOW);
    this.logger.debug(`PTT stop: GPIO value: ${this.gpioOutput?.readSync()}`);
  }

  onApplicationShutdown(signal?: string): void {
    this.gpioOutput?.writeSync(Gpio.LOW);
    this.gpioOutput?.unexport();
  }
}
