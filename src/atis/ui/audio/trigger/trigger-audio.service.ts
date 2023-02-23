import { Inject, LoggerService, OnApplicationBootstrap } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Porcupine } from '@picovoice/porcupine-node';
import { PvRecorder } from '@picovoice/pvrecorder-node';
import { GetConfigQuery } from '../../../application/query/get-config.query';
import { Config } from '../../../domain/valueobject/config.vo';
import { SynthesizeCurrentWeatherCommand } from '../../../application/command/synthesize-current-weather.command';
import { join } from 'path';
import { retryAsync } from '../../../../utils/retry';
import * as path from 'path';
import { TransmitMessageCommand } from '../../../application/command/transmit-message.command';

export class TriggerAudioService implements OnApplicationBootstrap {
  private detector?: Porcupine;
  private isListening = true;
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @Inject('AudioTriggerLogger') private readonly logger: LoggerService,
  ) {}

  async listen(): Promise<void> {
    try {
      const config = await this.queryBus.execute<GetConfigQuery, Config>(new GetConfigQuery());

      this.detector = new Porcupine(
        config.input.porcupine.accessKey,
        [path.join(process.cwd(), config.input.porcupine.ppnFilePath)],
        [config.input.porcupine.sensitivity],
      );

      const devices = PvRecorder.getAudioDevices();

      const deviceIndex = devices.indexOf(config.input.porcupine.device);
      if (deviceIndex === -1) {
        throw new Error(`Device ${config.input.porcupine.device} not found. Set correct device in Settings.`);
      }
      const recorder = new PvRecorder(deviceIndex, this.detector.frameLength);
      recorder.start();
      this.logger.log(`Listening for the keyword, using device: ${recorder.getSelectedDevice()}...`);

      while (this.isListening) {
        const pcm = await recorder.read();
        const detected = this.detector.process(pcm);
        if (detected !== -1) {
          this.isListening = false;
          recorder.stop();
          await retryAsync(async () => this.synthesizeCurrentWeather(config), {
            maxTries: 3,
            afterEachError: (e) => {
              this.logger.warn('Error during synthesizeCurrentWeather, retrying...');
              this.logger.error(e);
            },
            afterLastError: (e) => {
              throw e;
            },
          });

          recorder.start();
          this.isListening = true;
        }
      }
    } catch (e) {
      this.logger.error(e);
      this.logger.error('Exiting process.');
      process.exit(1);
    }
  }

  async synthesizeCurrentWeather(config: Config): Promise<void> {
    const mp3Path = await this.commandBus.execute<SynthesizeCurrentWeatherCommand, string>(
      new SynthesizeCurrentWeatherCommand(config, join(process.cwd(), 'output.mp3')),
    );

    await this.commandBus.execute<TransmitMessageCommand, void>(new TransmitMessageCommand(mp3Path, config.output));
  }

  onApplicationBootstrap(): void {
    this.logger.debug('Starting audio trigger service.');
    this.listen();
  }
}
