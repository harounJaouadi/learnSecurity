import { IsNotEmpty } from "class-validator";

export class CreadentialDto {
    @IsNotEmpty()
    username : string  ;
    @IsNotEmpty() 
    password : string ; 
}