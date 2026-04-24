import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
    // return 100;
  }
}

// let nombre:string="JUan"

// // nombre=false

// let nombre2="Mariana"

// nombre2=[1,2,3,4]


