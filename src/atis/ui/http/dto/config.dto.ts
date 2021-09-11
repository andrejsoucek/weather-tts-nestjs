import { IsEnum, IsNotEmpty, IsNumber, IsUrl } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { Config } from '../../../domain/valueobject/config.vo';
import { GpioConfig } from '../../../domain/entity/config/gpio-config.entity';
import { TtsConfig } from '../../../domain/entity/config/tts-config.entity';
import { WeatherDataConfig } from '../../../domain/entity/config/weather-data-config.entity';
import { MessageConfig } from '../../../domain/entity/config/message-config.entity';
import { RunwayCondition } from '../../../domain/valueobject/runway-condition.vo';
import { Comparator } from '../../../domain/enum/comparator.enum';
import { CircuitCondition } from '../../../domain/valueobject/circuit-condition.vo';

export class ConfigDto {
  @Expose({ name: 'gpio-config-id' })
  @IsNotEmpty()
  @IsNumber()
  @Transform((id) => parseInt(id.value, 10))
  gpioConfigId: number;

  @Expose({ name: 'gpio-input' })
  @IsNotEmpty()
  @IsNumber()
  @Transform((id) => parseInt(id.value, 10))
  gpioInput!: number;

  @Expose({ name: 'gpio-output' })
  @IsNotEmpty()
  @IsNumber()
  @Transform((id) => parseInt(id.value, 10))
  gpioOutput!: number;

  @Expose({ name: 'weather-data-config-id' })
  @IsNotEmpty()
  @IsNumber()
  @Transform((id) => parseInt(id.value, 10))
  weatherDataConfigId: number;

  @Expose({ name: 'realtime-url' })
  @IsNotEmpty()
  @IsUrl()
  realtimeUrl!: string;

  @Expose({ name: 'tts-config-id' })
  @IsNotEmpty()
  @IsNumber()
  @Transform((id) => parseInt(id.value, 10))
  ttsConfigId: number;

  @Expose({ name: 'tts-language' })
  @IsNotEmpty()
  ttsLanguage!: string;

  @Expose({ name: 'message-config-id' })
  @IsNotEmpty()
  @IsNumber()
  @Transform((id) => parseInt(id.value, 10))
  messageConfigId: number;

  @Expose({ name: 'message-template' })
  @IsNotEmpty()
  messageTemplate!: string;

  @Expose({ name: 'message-timezone' })
  @IsNotEmpty()
  messageTimezone!: string;

  @Expose({ name: 'message-wind-calm' })
  @IsNotEmpty()
  messageWindCalm!: string;

  @Expose({ name: 'message-wind-speed-unit' })
  @IsNotEmpty()
  messageWindSpeedUnit!: string;

  @Expose({ name: 'message-wind-bearing-unit' })
  @IsNotEmpty()
  messageWindBearingUnit!: string;

  @Expose({ name: 'message-wind-gust' })
  @IsNotEmpty()
  messageWindGust!: string;

  @Expose({ name: 'message-temperature-unit' })
  @IsNotEmpty()
  messageTemperatureUnit!: string;

  @Expose({ name: 'message-cloudbase-unit' })
  @IsNotEmpty()
  messageCloudbaseUnit!: string;

  @Expose({ name: 'message-rwy-comparator-0' })
  @IsNotEmpty()
  @IsEnum(Comparator)
  messageRwyComparator0!: Comparator;

  @Expose({ name: 'message-rwy-value-0' })
  @IsNotEmpty()
  @Transform((id) => parseInt(id.value, 10))
  messageRwyValue0!: number;

  @Expose({ name: 'message-rwy-result-0' })
  @IsNotEmpty()
  messageRwyResult0!: string;

  @Expose({ name: 'message-rwy-comparator-1' })
  @IsNotEmpty()
  @IsEnum(Comparator)
  messageRwyComparator1!: Comparator;

  @Expose({ name: 'message-rwy-value-1' })
  @IsNotEmpty()
  @IsNumber()
  @Transform((id) => parseInt(id.value, 10))
  messageRwyValue1!: number;

  @Expose({ name: 'message-rwy-result-1' })
  @IsNotEmpty()
  messageRwyResult1!: string;

  @Expose({ name: 'message-circuit-comparator-0' })
  @IsNotEmpty()
  @IsEnum(Comparator)
  messageCircuitComparator0!: Comparator;

  @Expose({ name: 'message-circuit-value-0' })
  @IsNotEmpty()
  @IsNumber()
  @Transform((id) => parseInt(id.value, 10))
  messageCircuitValue0!: number;

  @Expose({ name: 'message-circuit-result-0' })
  @IsNotEmpty()
  messageCircuitResult0!: string;

  @Expose({ name: 'message-circuit-comparator-1' })
  @IsNotEmpty()
  @IsEnum(Comparator)
  messageCircuitComparator1!: Comparator;

  @Expose({ name: 'message-circuit-value-1' })
  @IsNotEmpty()
  @IsNumber()
  @Transform((id) => parseInt(id.value, 10))
  messageCircuitValue1!: number;

  @Expose({ name: 'message-circuit-result-1' })
  @IsNotEmpty()
  messageCircuitResult1!: string;

  toValueObject(): Config {
    return new Config(
      new GpioConfig(this.gpioConfigId, this.gpioInput, this.gpioOutput),
      new TtsConfig(this.ttsConfigId, this.ttsLanguage),
      new WeatherDataConfig(this.weatherDataConfigId, this.realtimeUrl),
      new MessageConfig(
        this.messageConfigId,
        this.messageTemplate,
        this.messageTimezone,
        this.messageWindSpeedUnit,
        this.messageWindBearingUnit,
        this.messageWindCalm,
        this.messageWindGust,
        this.messageTemperatureUnit,
        this.messageCloudbaseUnit,
        this.createRwyConditions(),
        this.createCircuitsConditions(),
      ),
    );
  }

  private createRwyConditions(): RunwayCondition[] {
    return [
      new RunwayCondition(this.messageRwyComparator0, this.messageRwyValue0, this.messageRwyResult0),
      new RunwayCondition(this.messageRwyComparator1, this.messageRwyValue1, this.messageRwyResult1),
    ];
  }

  private createCircuitsConditions(): CircuitCondition[] {
    return [
      new CircuitCondition(this.messageCircuitComparator0, this.messageCircuitValue0, this.messageCircuitResult0),
      new CircuitCondition(this.messageCircuitComparator1, this.messageCircuitValue1, this.messageCircuitResult1),
    ];
  }
}
