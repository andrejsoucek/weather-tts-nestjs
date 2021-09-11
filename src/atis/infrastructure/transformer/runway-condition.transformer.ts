import { ValueTransformer } from 'typeorm';
import { RunwayCondition } from '../../domain/valueobject/runway-condition.vo';

export class RunwayConditionTransformer implements ValueTransformer {
  from(value: string): RunwayCondition[] {
    const data = JSON.parse(value);
    return data.map((condition) => {
      return new RunwayCondition(condition.comparator, condition.value, condition.result);
    });
  }
  to(value: RunwayCondition[]): string {
    return value.toString();
  }
}
