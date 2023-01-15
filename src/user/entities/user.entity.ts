import { roleEnum } from "src/enum/role.enum";
import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";


@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50, unique: true })
  username: string;
  @Column()
  password: string;
  @Column({ unique: true })
  email: string;
  @Column()
  salt : string  ; 
  @Column({type : "enum" ,enum : roleEnum ,default : roleEnum.USER }) 
  role :  string ; 
  


  

}
