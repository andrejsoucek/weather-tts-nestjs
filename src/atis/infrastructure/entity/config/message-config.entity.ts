import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MessageConfig {
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
