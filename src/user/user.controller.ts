import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreadentialDto } from './dto/credentialDto';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Req } from '@nestjs/common/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  register(@Body() userData : CreateUserDto):Promise<Partial<User>> {
    return this.userService.register(userData) ; 
  }
  @Post("login")
  login(@Body() credential : CreadentialDto){
    return this.userService.login(credential) ;
  };


  @Get()
  @UseGuards(JwtAuthGuard)
  test(@Req() req){
    console.log(req)
    return {msg : "you have succeded",user :req.user} ; 
  }

  @UseGuards(JwtAuthGuard)
  @Get("solvedTasks")
  solvedTasks(@Req() req ){
    return this.userService.findSolvedTasks(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("solvedRooms")
  solvedRooms(@Req() req ){
    return this.userService.findSolvedRooms(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("visitedRooms")
  visitedRooms(@Req() req ){
    return this.userService.findVisitedRooms(req.user.id);
  }
  
}
