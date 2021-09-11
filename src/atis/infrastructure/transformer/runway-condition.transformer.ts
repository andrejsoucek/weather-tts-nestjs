import { ValueTransformer } from 'typeorm';
import { RunwayCondition } from '../../domain/valueobject/runway-condition.vo';
import { plainToClass } from 'class-transformer';

export class RunwayConditionTransformer implements ValueTransformer {
  from(value: string): RunwayCondition[] {
    const data = JSON.parse(value);
    return plainToClass(RunwayCondition, data as any[]);
  }
  to(value: RunwayCondition[]): string {
    return value.toString();
  }
}
