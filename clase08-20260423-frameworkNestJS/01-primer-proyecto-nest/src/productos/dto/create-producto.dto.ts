import { IsNumber, IsPositive, IsString } from "class-validator"

export class CreateProductoDto {

    @IsString()
    title:string

    @IsNumber()
    @IsPositive()
    price:number
}
