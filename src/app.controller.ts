import { Controller, Get } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import { CreateUserDto } from './user/dto/create-user.dto';
import {exec} from "child_process" ; 

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }





  /////////////////script excecuting with cmd 
  @Get("script")
  execScript(){
    exec('cd',(e,stdout,stderr)=>{
      if(e instanceof Error){
        console.log(e) ;
      }else{
        console.log(stdout) ;
        console.log(stderr) ;
      }
    })
  }

  
}
