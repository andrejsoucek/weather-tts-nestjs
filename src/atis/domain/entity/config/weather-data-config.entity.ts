import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

Entity();
export class WeatherDataConfig {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  url: string;
}
