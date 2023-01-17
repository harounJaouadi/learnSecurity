import { Question } from 'src/question/entities/question.entity';
import { Room } from 'src/room/entities/room.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @Column()
  description: string;
  

  @OneToMany(
    (type) => Question,
    (question: Question) =>question.task ,
    {
      eager: true,
      onDelete: 'SET NULL', //when I delete a  task : id_task in the question will have a null value
    },
  )
  questions: Question[];
  

  @ManyToOne(
    type => Room,
    (room: Room) =>room.tasks,
    // {eager :true}
  )
  room: Room;
  //user : id/username/email/[password/salt/role]/enteredRooms: room[](in each room)/solvedTasks : tasks[] /scoreNetwork/scoreWeb/scoreOther
  //room : id/type:enum["web" , "network"....]/name/description/tasks[]
  //task : id / name / description  / vmScriptName /questions[]
  //question : id /name / correct answer
}
