import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { get } from 'http';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //@Get('product')
  //getProduct(): string[] {
  //return this.appService.getAll();
  //}

  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }
}
