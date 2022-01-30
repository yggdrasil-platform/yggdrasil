import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import createServer from 'next';
import { NextServer, RequestHandler } from 'next/dist/server/next';
import { resolve } from 'path';

// Interfaces
import { IEnvironmentVariables } from '../common/interfaces';

@Injectable()
export default class ViewService implements OnModuleInit {
  private nextServer: NextServer;

  constructor(
    private readonly configService: ConfigService<IEnvironmentVariables, true>,
  ) {}

  public async onModuleInit(): Promise<void> {
    try {
      this.nextServer = createServer({
        dev: this.configService.get<string>('NODE_ENV') !== 'production',
        dir: './apps/midgard/src/web',
      });

      await this.nextServer.prepare();
    } catch (error) {
      console.error(error);
    }
  }

  public getRequestHandler(): RequestHandler {
    return this.nextServer.getRequestHandler();
  }
}
