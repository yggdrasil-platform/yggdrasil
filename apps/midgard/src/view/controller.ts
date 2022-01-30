import { Controller, Get, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { RequestHandler } from 'next/dist/server/next';

// Providers
import ViewService from './service';

@Controller('/')
export default class ViewController {
  constructor(private viewService: ViewService) {}

  @Get('*')
  public async static(@Req() req: Request, @Res() res: Response) {
    const handler: RequestHandler = this.viewService.getRequestHandler();

    await handler(req, res);
  }
}
