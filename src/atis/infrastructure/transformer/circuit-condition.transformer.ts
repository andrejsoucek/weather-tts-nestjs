import { ValueTransformer } from 'typeorm';
import { CircuitCondition } from '../../domain/valueobject/circuit-condition.vo';
import { plainToClass } from 'class-transformer';

export class CircuitConditionTransformer implements ValueTransformer {
  from(value: string): CircuitCondition[] {
    const data: any[] = JSON.parse(value);
    return plainToClass(CircuitCondition, data);
  }
  to(value: CircuitCondition[]): string {
    return JSON.stringify(value);
  }
}
