export class WeatherNotFoundException extends Error {
  private constructor(public readonly url: string) {
    super();
  }

  public static createWithUrl(url: string) {
    return new WeatherNotFoundException(url);
  }
}
