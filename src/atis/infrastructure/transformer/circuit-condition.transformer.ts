import { ValueTransformer } from 'typeorm';
import { CircuitCondition } from '../../domain/valueobject/circuit-condition.vo';

export class CircuitConditionTransformer implements ValueTransformer {
  from(value: string): CircuitCondition[] {
    const data = JSON.parse(value);
    return data.map((condition) => {
      return new CircuitCondition(condition.comparator, condition.value, condition.result);
    });
  }
  to(value: CircuitCondition[]): string {
    return value.toString();
  }
}
