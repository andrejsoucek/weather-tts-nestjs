import { GpioConfig } from '../entity/config/gpio-config.entity';
import { TtsConfig } from '../entity/config/tts-config.entity';
import { WeatherDataConfig } from '../entity/config/weather-data-config.entity';
import { MessageConfig } from '../entity/config/message-config.entity';

export class Config {
  constructor(
    public readonly gpio: GpioConfig,
    public readonly tts: TtsConfig,
    public readonly weatherData: WeatherDataConfig,
    public readonly message: MessageConfig,
  ) {}
}
