import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'gpio_config' })
export class GpioConfigSqlite {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  input: number;
  @Column()
  output: number;
}
