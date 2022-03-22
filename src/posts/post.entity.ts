import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列 值自动生成

  @Column({ length: 50 })
  title: string;

  @Column('text')
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}
