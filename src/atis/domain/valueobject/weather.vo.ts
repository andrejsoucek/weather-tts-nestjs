export class Weather {
  constructor(
    public readonly time: string,
    public readonly date: string,
    public readonly windSpeed: string,
    public readonly windGust: string,
    public readonly windBearing: string,
    public readonly temperature: string,
    public readonly cloudBase: string,
    public readonly pressure: string,
  ) {}
}
