import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exec } from 'child_process';
import { TaskService } from 'src/task/task.service';
import { Repository } from 'typeorm';
// import { CreateRoomDto } from './dto/create-room.dto';
// import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { PowerShell } from 'node-powershell';


@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async findRoomWithTaskId(id: number) {
    const allRooms = await this.roomRepository.find();

    for (const room of allRooms) {
      const task = room.tasks.find((task) => task.id == id);
      if (task) {
        return room;
      }
    }
    return null;
  }
  async findAllRooms() {
    return this.roomRepository.find();
  }

  async findRoomById(id: number) {
    return this.roomRepository.findOneBy({ id });
  }

  async execScript(id: number) {
    const room = await this.roomRepository.findOneBy({ id });
    const scriptName = room.vmScriptName;
    


    const poshInstance = async () => {
      const ps = new PowerShell();

      const command = PowerShell.command`cd src\\scripts ; ./${scriptName}.ps1`;
      const output = await ps.invoke(command);
      ps.dispose();
      return output.raw ;
    };

    const ip=await poshInstance() ;
    return {ip}
    
  }
}
