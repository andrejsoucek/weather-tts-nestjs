import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GpioConfig {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  input: number;
  @Column()
  output: number;
}
