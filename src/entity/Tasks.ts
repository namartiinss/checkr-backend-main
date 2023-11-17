import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User'; // Importe a entidade User correta

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    default: false,
  })
  finished: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.tasks) // Muitas tarefas pertencem a um usuário
  @JoinColumn({ name: 'user_id' }) // Coluna que conecta as tarefas ao usuário
  user: User;
}
