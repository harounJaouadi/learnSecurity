import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AnswerDto } from './dto/answer.dto';
import { JwtAuthGuard } from 'src/user/guard/jwt-auth.guard';
import { Req } from '@nestjs/common/decorators';
import { Request } from 'express';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  submitTask(@Body() answers: AnswerDto[], @Param('id') id: number , @Req() request :Request  ) {
    return this.taskService.checkResponse(id, answers ,request.user);
    // return this.taskService.findAll();
  }
  
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findTaskQuestion(@Param("id") id : number){
    return this.taskService.questionByTaskId(id) ; 
  }
}
