export class Weather {
  constructor(
    private readonly time: string,
    private readonly date: string,
    private readonly windSpeed: string,
    private readonly windGust: string,
    private readonly windBearing: string,
    private readonly temperature: string,
    private readonly cloudBase: string,
    private readonly pressure: string,
  ) {}
}
