import { RunwayCondition } from '../../valueobject/runway-condition.vo';

export class MessageConfig {
  public constructor(
    public readonly id: number,
    public readonly template: string,
    public readonly timezone: string,
    public readonly windSpeedUnit: string,
    public readonly windBearingUnit: string,
    public readonly windCalm: string,
    public readonly windGust: string,
    public readonly temperatureUnit: string,
    public readonly cloudBaseUnit: string,
    public readonly rwy: RunwayCondition[],
    public readonly circuits: RunwayCondition[],
  ) {}
}
