export class UnexpectedWeatherFormatException extends Error {
  private constructor() {
    super();
  }

  public static create() {
    return new UnexpectedWeatherFormatException();
  }
}
