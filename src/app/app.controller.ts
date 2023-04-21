import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(ConfigService)
  public config: ConfigService;

  @Get()
  greet(){
    console.log(this.config.get('DB_USERNAME'));
  }
}
