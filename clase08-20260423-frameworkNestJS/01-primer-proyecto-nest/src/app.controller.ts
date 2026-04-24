import { BadRequestException, Body, Controller, Get, Logger, Param, ParseIntPipe, Post, Query, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { typeUser} from './types/main';
import { User } from './Users/Users';


@Controller("api")
// @UsePipes(new ValidationPipe({whitelist:true, forbidNonWhitelisted:true}))
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {

    let usuario1:typeUser

    usuario1={
      nombre:"Juan", 
      email:"juan@test.com", 
      // domicilio:"calle..."
    }

    return this.appService.getHello();
  }

  @Post("users")
  crearUsuario(@Body(new ValidationPipe({whitelist:true, forbidNonWhitelisted: true})) usuario:User){
    
    

    let {email}=usuario
    if(!email) throw new BadRequestException("email es requerido")

    Logger.debug(usuario, "post Users - AppController")

    return `Nuevo usuario...!!!`
  }

  @Get("informe")
  listUsers(@Request() req){
    Logger.verbose(req.headers, "listUsers - AppController")
    Logger.verbose(req.query, "listUsers - AppController")


    return "Informe...!!!"
  }

  @Get("users/:id")
  getUser(@Param("id") legajo:number){

    console.log(legajo, typeof legajo)

    legajo=Number(legajo)   
    if(isNaN(legajo)){
      throw new BadRequestException("Legajo debe ser numérico")
    }
    // legajo=true

    return `Datos usuario ${legajo}`
  }


  @Get("products/:id")
  getProduct(@Param("id", ParseIntPipe ) id:number){
    console.log(id, typeof id)

    // legajo=true


    return `Datos producto ${id}`
  }

  @Get("users")
  getUsers(@Query("cantid", new ParseIntPipe({optional:true})) limit, @Query("nombre") nombre){

    console.log({limit, nombre})
    if(!limit){
      throw new BadRequestException("Complete query param cantid")
    }

    let usuarios=[
      {id:1, nombre:"Luciana", email:"luciana@test.com", password:"123", rol:"user"},
      {id:2, nombre:"Juan", email:"juan@test.com", password:"123", rol:"user"},
      {id:3, nombre:"Romina", email:"romina@test.com", password:"123", rol:"admin"},
    ]

    return usuarios
  }
}


// class User{
//   nombre:string
//   edad:number
//   email:number

//   constructor(nombre){
//       this.nombre=nombre
//   }
// }