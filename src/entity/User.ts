import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tasks } from './Tasks'; // Importe a entidade Tasks correta

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Tasks, task => task.user) // Um usuário tem muitas tarefas
  tasks: Tasks[];
}
