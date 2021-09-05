import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tts_config' })
export class TTSConfigSqlite {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  language: string;
}
