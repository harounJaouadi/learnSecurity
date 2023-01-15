import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { RoomModule } from './room/room.module';
import { QuestionModule } from './question/question.module';
import { Room } from './room/entities/room.entity';
import { Task } from './task/entities/task.entity';
import { Question } from './question/entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: "localhost",
      port: 3306 ,
      username: "root",
      password: "",
      database: "securityplateform",
      entities: [User,Room,Task,Question],
      synchronize: true
      // migrationsRun: true

    }),
    UserModule,
    TaskModule,
    RoomModule,
    QuestionModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
