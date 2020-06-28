import { Controller, Get, Redirect, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  findOne(@Param('id') id): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }
}
