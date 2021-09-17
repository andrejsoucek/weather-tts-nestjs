export class SynthesizeCommand {
  constructor(
    public readonly message: string,
    public readonly language: string,
    public readonly fileOutputPath: string,
  ) {}
}
