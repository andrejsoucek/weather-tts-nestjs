import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'weather_data_config' })
export class WeatherDataConfigSqlite {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  url: string;
}
