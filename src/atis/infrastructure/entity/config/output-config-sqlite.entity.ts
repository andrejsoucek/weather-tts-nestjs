import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'output_config' })
export class OutputConfigSqlite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gpioOutputPin: number | null;
}
