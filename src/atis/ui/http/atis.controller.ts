import { Controller, Get, Render, Res } from '@nestjs/common';

@Controller()
export class AtisController {
  @Get()
  @Render('test')
  index(): { message: string } {
    return { message: 'Hello!' };
  }
}
