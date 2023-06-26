import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  //getAll(): string[] {
  //return ['guitarrra', 'instrumentos de cuerdas'];
  //}

  //getAll(): string[] {
  //return ['hola'];
  //}
}
