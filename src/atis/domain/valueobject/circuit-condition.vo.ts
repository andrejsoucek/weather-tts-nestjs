import { Comparator } from '../enum/comparator.enum';

export class CircuitCondition {
  constructor(public readonly comparator: Comparator, public readonly value: number, public readonly result: string) {}
}
