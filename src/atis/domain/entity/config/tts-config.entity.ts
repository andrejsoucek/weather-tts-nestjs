import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TTSConfig {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  language: string;
}
