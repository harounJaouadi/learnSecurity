import { roomTypeEnum } from 'src/enum/roomType.enum';
import { Task } from 'src/task/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('room')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: roomTypeEnum, default: roomTypeEnum.OTHER })
  type: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  vmScriptName: string;

  @OneToMany((type) => Task, (task: Task) => task.room, {
    eager: true,
    onDelete: 'SET NULL', //when I delete a  task : id_task in the question will have a null value
  })
  tasks: Task[];

  //user : id/username/email/[password/salt/role]/enteredRooms: room[](in each room)/solvedTasks : tasks[] /scoreNetwork/scoreWeb/scoreOther
  //room : id/type:enum["web" , "network"....]/name/vmScriptName/description/tasks[]
  //task : id / name / description   /questions[]
  //question : id /name / correct answer
}
