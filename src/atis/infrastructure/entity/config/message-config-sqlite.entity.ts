import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RunwayCondition } from '../../../domain/valueobject/runway-condition.vo';
import { CircuitCondition } from '../../../domain/valueobject/circuit-condition.vo';
import { RunwayConditionTransformer } from '../../transformer/runway-condition.transformer';
import { CircuitConditionTransformer } from '../../transformer/circuit-condition.transformer';

@Entity({ name: 'message_config' })
export class MessageConfigSqlite {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  template: string;
  @Column()
  timezone: string;
  @Column()
  windSpeedUnit: string;
  @Column()
  windBearingUnit: string;
  @Column()
  windCalm: string;
  @Column()
  windGust: string;
  @Column()
  temperatureUnit: string;
  @Column()
  cloudBaseUnit: string;
  @Column({ type: 'varchar', transformer: new RunwayConditionTransformer() })
  rwy: RunwayCondition[];
  @Column({ type: 'varchar', transformer: new CircuitConditionTransformer() })
  circuits: CircuitCondition[];
}
