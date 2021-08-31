import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class DailyStats {
  @PrimaryColumn()
  dayTimestamp: number;
  @Column({ default: 0 })
  messagesCount: number;
  @Column({ default: 0 })
  charactersCount: number;
}
