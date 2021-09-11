import { Inject, Injectable } from '@nestjs/common';
import { Comparator } from '../../enum/comparator.enum';
import { Weather } from '../../valueobject/weather.vo';
import { MessageConfig } from '../../entity/config/message-config.entity';
import { CircuitCondition } from '../../valueobject/circuit-condition.vo';
import { RunwayCondition } from '../../valueobject/runway-condition.vo';
import { MomentTimezone } from 'moment-timezone';

@Injectable()
export class MessageService {
  private static operations = new Map<Comparator, (a: number, b: number) => boolean>([
    [Comparator.LESS_THAN, (a: number, b: number) => a < b],
    [Comparator.HIGHER_THAN, (a: number, b: number) => a > b],
    [Comparator.LESS_THAN_OR_EQUAL, (a: number, b: number) => a <= b],
    [Comparator.HIGHER_THAN_OR_EQUAL, (a: number, b: number) => a >= b],
  ]);

  constructor(@Inject('MomentTimezone') private readonly moment: MomentTimezone) {}

  public composeMessage(weather: Weather, cfg: MessageConfig): string {
    const { template } = cfg;

    const replaced = template
      .replace('<#TIME>', this.formatTime(weather.time, weather.date, cfg.timezone))
      .replace(
        '<#WIND>',
        this.formatWind(
          weather.windSpeed,
          weather.windGust,
          weather.windBearing,
          cfg.windCalm,
          cfg.windSpeedUnit,
          cfg.windBearingUnit,
          cfg.windGust,
        ),
      )
      .replace('<#RWY>', this.formatRwy(weather.windBearing, cfg.rwy))
      .replace('<#CIRCUIT>', this.formatCircuit(weather.windBearing, cfg.circuits))
      .replace('<#TEMP>', this.formatTemperature(weather.temperature, cfg.temperatureUnit))
      .replace('<#CLOUDBASE>', this.formatCloudbase(weather.cloudBase, cfg.cloudBaseUnit))
      .replace('<#QNH>', this.formatQnh(weather.pressure))
      .replace(new RegExp('<#BREAK-NONE>', 'gm'), this.formatBreakNone())
      .replace(new RegExp('<#BREAK-SHORT>', 'gm'), this.formatBreakShort())
      .replace(new RegExp('<#BREAK-LONG>', 'gm'), this.formatBreakLong());

    return `<speak>${replaced}</speak>`;
  }

  private formatTime(time: string, date: string, tz: string): string {
    const dateTime = this.moment(`${date} ${time}`, 'DD/MM/YYYY hh:mm:ss', tz).tz('UTC');

    return `<say-as interpret-as="time" format="hm24Z">${dateTime.format('HH:mm')} UTC</say-as>`;
  }

  private formatWind(
    speed: string,
    gust: string,
    bearing: string,
    windCalm: string,
    windSpeedUnit: string,
    windBearingUnit: string,
    windGust: string,
  ): string {
    const speedFloat = parseFloat(speed);
    if (speedFloat < 2) {
      return windCalm;
    }
    const b = `<say-as interpret-as="characters">${bearing}</say-as> ${windBearingUnit}`;
    const s = `<say-as interpret-as="characters">${Math.round(parseFloat(speed))}</say-as> ${windSpeedUnit}`;
    const g =
      parseFloat(gust) - speedFloat > 3
        ? `. ${windGust} <say-as interpret-as="characters">${Math.round(parseFloat(gust))}</say-as>`
        : '';

    return `${b} ${s}${g}`;
  }

  private formatRwy(bearing: string, cfg: RunwayCondition[]): string {
    for (let i = 0; i < cfg.length; i += 1) {
      const c = cfg[i];
      const operation = MessageService.operations.get(c.comparator);
      if (operation && operation(parseFloat(bearing), c.value)) {
        return `<say-as interpret-as="characters">${c.result.padStart(2, '0')}</say-as>`;
      }
    }

    return '';
  }

  private formatCircuit(bearing: string, cfg: CircuitCondition[]): string {
    for (let i = 0; i < cfg.length; i += 1) {
      const c = cfg[i];
      const operation = MessageService.operations.get(c.comparator);
      if (operation && operation(parseFloat(bearing), c.value)) {
        return c.result;
      }
    }

    return '';
  }

  private formatTemperature(temperature: string, unit: string): string {
    return `<say-as interpret-as="cardinal">${Math.round(parseFloat(temperature))}</say-as> ${unit}`;
  }

  private formatCloudbase(cloudbase: string, unit: string): string {
    return `<say-as interpret-as="cardinal">${cloudbase}</say-as> ${unit}`;
  }

  private formatQnh(pressure: string): string {
    return `<say-as interpret-as="characters">${Math.round(parseFloat(pressure))}</say-as>`;
  }

  private formatBreakNone(): string {
    return '<break time="50ms"/>';
  }

  private formatBreakShort(): string {
    return '<break time="500ms"/>';
  }

  private formatBreakLong(): string {
    return '<break time="1000ms"/>';
  }
}
