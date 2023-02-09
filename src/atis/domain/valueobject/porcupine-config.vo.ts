export class PorcupineConfig {
  public constructor(
    public readonly accessKey: string,
    public readonly ppnFilePath: string,
    public readonly sensitivity: number,
    public readonly device: string,
  ) {}
}
