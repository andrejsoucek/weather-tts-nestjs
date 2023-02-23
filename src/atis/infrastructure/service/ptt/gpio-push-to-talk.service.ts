import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { PushToTalkService } from '../../../domain/service/ptt/push-to-talk.service';
import { Gpio } from 'onoff';
import { OutputConfig } from '../../../domain/entity/config/output-config.entity';
import {
  GET_OUTPUT_CONFIG_REPOSITORY,
  GetOutputConfigRepository,
} from '../../../domain/repository/config/get-output-config.repository';

@Injectable()
export class GpioPushToTalkService implements PushToTalkService, OnApplicationShutdown, OnApplicationBootstrap {
  private gpioOutput?: Gpio;
  constructor(
    @Inject('InfrastructureLogger') private readonly logger: LoggerService,
    @Inject(GET_OUTPUT_CONFIG_REPOSITORY) private readonly cfgRepository: GetOutputConfigRepository,
  ) {
    logger.debug('GPIO PTT service created');
  }

  startTransmission(config: OutputConfig): void {
    this.gpioOutput?.writeSync(Gpio.HIGH);
    this.logger.debug(`PTT start: GPIO value: ${this.gpioOutput?.readSync()}`);
  }

  stopTransmission(): void {
    this.gpioOutput?.writeSync(Gpio.LOW);
    this.logger.debug(`PTT stop: GPIO value: ${this.gpioOutput?.readSync()}`);
  }

  onApplicationShutdown(signal?: string): void {
    this.gpioOutput.writeSync(Gpio.LOW);
    this.gpioOutput.unexport();
  }

  async onApplicationBootstrap(): Promise<void> {
    const outputConfig = await this.cfgRepository.getOutputConfig();
    this.gpioOutput = new Gpio(outputConfig.gpioOutputPin, 'out', 'none', { debounceTimeout: 10 });
    this.gpioOutput.writeSync(Gpio.LOW);
  }
}
