export class DailyStats {
  public constructor(
    public readonly dayTimestamp: number,
    public readonly messagesCount: number,
    public readonly charactersCount: number,
  ) {}
}
