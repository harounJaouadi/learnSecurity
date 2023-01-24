import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from 'src/user/guard/jwt-auth.guard';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @UseGuards(JwtAuthGuard)
  @Get("task/:id")//for test only
  find(@Param("id") id:number){
    return this.roomService.findRoomWithTaskId(id);
  }  

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(){
    return this.roomService.findAllRooms() ; 
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findRoomById(@Param("id") id : number){
    return this.roomService.findRoomById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("scriptRoom/:id")
  execScript(@Param("id") id:number){
    return this.roomService.execScript(id);
  }

}
