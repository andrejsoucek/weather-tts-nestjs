import { TtsConfig } from '../entity/config/tts-config.entity';
import { WeatherDataConfig } from '../entity/config/weather-data-config.entity';
import { MessageConfig } from '../entity/config/message-config.entity';
import { InputConfig } from '../entity/config/input-config.entity';
import { OutputConfig } from '../entity/config/output-config.entity';

export class Config {
  constructor(
    public readonly input: InputConfig,
    public readonly output: OutputConfig,
    public readonly tts: TtsConfig,
    public readonly weatherData: WeatherDataConfig,
    public readonly message: MessageConfig,
  ) {}
}
