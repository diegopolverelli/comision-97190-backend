import { IsEmail, IsNumber, IsOptional, IsString, IsStrongPassword } from "class-validator"

export class User{

    @IsString()
    nombre:string
    
    @IsNumber()
    @IsOptional()
    edad?:number
    
    @IsEmail()
    email:number

    @IsStrongPassword()
    password:string
}
