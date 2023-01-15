import { Task } from 'src/task/entities/task.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('question')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @Column()
  correctAnwser: string;


  @ManyToOne(
    (type) => Task,
    (task: Task) => task.questions,
    
  )
  task: Task;
  
  //user : id/username/email/[password/salt/role]/enteredRooms: room[](in each room)/solvedTasks : tasks[] /scoreNetwork/scoreWeb/scoreOther
  //room : id/type:enum["web" , "network"....]/name/description/tasks[]
  //task : id / name / description   / vmScriptName /questions[]
  //question : id /name / correct answer
}
