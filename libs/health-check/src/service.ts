import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Types
import { IEnvironmentVariables } from '@app/common/interfaces';
import { HealthCheck } from './types';

@Injectable()
export default class HealthCheckService {
  constructor(
    private readonly configService: ConfigService<IEnvironmentVariables>
  ) {}

  async get(): Promise<HealthCheck> {
    return {
      environment: this.configService.get<string>('NODE_ENV') || null,
      name: this.configService.get<string>('APP_NAME') || null,
      version: this.configService.get<string>('VERSION') || null,
    };
  }
}
