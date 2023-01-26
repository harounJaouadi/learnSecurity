import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/room/entities/room.entity';
import { RoomService } from 'src/room/room.service';
import { UserService } from 'src/user/user.service';
import { QueryBuilder, Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly userService: UserService,
    private readonly roomService: RoomService,
  ) {}

  async checkResponse(id: number, answersArray: any, user: any) {
    try {
      const task = await this.taskRepository.findOneBy({ id: id });

      const questions = task.questions;
      const correctQuestionsIds = [];
      for (const answerTry of answersArray) {
        const question = questions.find(
          (question) => question.id == answerTry.id,
        );
        if (answerTry.answer == question.correctAnwser) {
          correctQuestionsIds.push(question.id);
        }
      }
      if (correctQuestionsIds.length == questions.length) {
        const updatedUser = await this.userService.findUserById(user.id);
        // console.log(user); //log test
        // console.log(updatedUser); // log test
        if (!updatedUser.solvedTasks.find((el) => el.id == id)) {
          console.log('test');
          updatedUser.solvedTasks.push(task);

          const room = await this.roomService.findRoomWithTaskId(task.id);
          updatedUser.visitedRooms.push(room);
          const roomSize = room.tasks.length;
          let numberOfTaskSolvedInTheRoom = 0;
          for (const task of updatedUser.solvedTasks) {
            const foundedTask = room.tasks.find((el) => el.id == task.id);
            if (foundedTask) {
              numberOfTaskSolvedInTheRoom++;
            }
          }
          if (numberOfTaskSolvedInTheRoom == roomSize) {
            updatedUser.solvedRooms.push(room);
            const type=room.type ;
            if(type=="web"){
              (updatedUser.scoreWeb)++ ;
            }else if (type=="network"){
              (updatedUser.scoreNetwork)++
            }else{
              (updatedUser.scoreOther)++
            }
            
            

          }
          
          await this.userService.updateUser(updatedUser);
        }

        return { solved: correctQuestionsIds, taskSolved: true };
      } else {
        return { solved: correctQuestionsIds, taskSolved: false };
      }
    } catch (error) {
      return { msg: 'error in the request' };
    }
  }

  async questionByTaskId(id :number){
    const task=await this.taskRepository.findOneBy({id}) ; 
    return task.questions ; 
  }

}
