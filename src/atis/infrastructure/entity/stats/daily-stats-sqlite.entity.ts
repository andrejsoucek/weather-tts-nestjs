import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'daily_stats' })
export class DailyStatsSqlite {
  @PrimaryColumn()
  dayTimestamp: number;
  @Column({ default: 0 })
  messagesCount: number;
  @Column({ default: 0 })
  charactersCount: number;
}
