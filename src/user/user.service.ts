import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreadentialDto } from './dto/credentialDto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<Partial<User>>,
    private readonly jwtService: JwtService,
  ) {}
  async register(userData: CreateUserDto): Promise<Partial<User>> {
    const { username, password, email } = userData;
    const user = this.userRepository.create({ username, password, email });
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(
        'register failed maybe the username or email is used',
        HttpStatus.FORBIDDEN,
      );
    }
    return { id: user.id, username: user.username, email: user.email };
  }
  async login(credential: CreadentialDto) {
    const { username, password } = credential;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username=:username or user.email=:username', { username })
      .getOne();
    if (!user) {
      throw new NotFoundException('username or password incorrect');
    }
    const hashedPassword = await bcrypt.hash(password, user.salt);

    if (hashedPassword == user.password) {
      const payload = {
        username: user.username,
        email: user.email,
        role: user.role,
      };
      const token = this.jwtService.sign(payload);
      return {
        token,
        user,
      };
    } else {
      throw new NotFoundException('username or password incorrect');
    }
  }

  async findUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
  async updateUser(user: Partial<User>) {
    return await this.userRepository.save(user);
  }

  async findSolvedTasks(id:number){
    const theUser=await this.userRepository.findOneBy({id});
    return theUser.solvedTasks ; 
  } ;
  async findVisitedRooms(id:number){
    const theUser=await this.userRepository.findOneBy({id});
    return theUser.visitedRooms ; 
  } ;
  async findSolvedRooms(id:number){
    const theUser=await this.userRepository.findOneBy({id});
    return theUser.solvedRooms; 
  } ;
}
