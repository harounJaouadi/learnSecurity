import { IsNotEmpty } from "class-validator";

export class AnswerDto{
    @IsNotEmpty()
    id : number ;
    @IsNotEmpty() 
    answer : string ; 
}