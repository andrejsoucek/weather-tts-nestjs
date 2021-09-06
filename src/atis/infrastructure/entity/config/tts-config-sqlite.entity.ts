import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tts_config' })
export class TtsConfigSqlite {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  language: string;
}
