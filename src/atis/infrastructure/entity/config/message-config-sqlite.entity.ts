import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column()
  rwy: string;
  @Column()
  circuits: string;
}
