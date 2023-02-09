import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'input_config' })
export class InputConfigSqlite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gpioInputPin: number;

  @Column()
  porcupineAccessKey: string;

  @Column()
  ppnFilePath: string;

  @Column()
  sensitivity: number;

  @Column()
  device: string;
}
