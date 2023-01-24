import { roleEnum } from 'src/enum/role.enum';
import { Room } from 'src/room/entities/room.entity';
import { Task } from 'src/task/entities/task.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50, unique: true })
  username: string;
  @Column()
  password: string;
  @Column({ unique: true })
  email: string;
  @Column()
  salt: string;
  @Column({ type: 'enum', enum: roleEnum, default: roleEnum.USER })
  role: string;
  //user : id/username/email/[password/salt/role]/enteredRooms: room[](in each room)/solvedTasks : tasks[] /scoreNetwork/scoreWeb/scoreOther
  @ManyToMany((type) => Task, { eager: true })
  @JoinTable()
  solvedTasks: Task[];

  @ManyToMany((type) => Room, { eager: true })
  @JoinTable()
  solvedRooms: Room[];

  @ManyToMany((type) => Room, { eager: true })
  @JoinTable()
  visitedRooms: Room[];

  @Column({ default: 0 })
  scoreWeb: number;
  @Column({ default: 0 })
  scoreNetwork: number;
  @Column({ default: 0 })
  scoreOther: number;

  @Column({nullable:true})
  profileImage :string ;
}

// {
//   name: 'users_tasks', nom de la table à générer
//   joinColumn: {
//     name: 'user', nom du champ représentant l’entité actuelle
//     referencedColumnName: 'id',
//   },
//   inverseJoinColumn: {
//     name: 'task', nom du champ représentant l’entité en relation avec cet entité
//     referencedColumnName: 'id',
//   },
// }

//submit a task
//
