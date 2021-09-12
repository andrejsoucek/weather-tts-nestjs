export interface TriggerService {
  listen(): void;
  unlisten(): void;
}

export const TRIGGER_SERVICE = Symbol.for('TriggerService');
