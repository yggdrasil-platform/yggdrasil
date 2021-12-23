import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Interfaces
import { IEnvironmentVariables, IHealth } from '@app/common/interfaces';

@Injectable()
export default class HealthService {
  constructor(
    private readonly configService: ConfigService<IEnvironmentVariables>
  ) {}

  async get(): Promise<IHealth> {
    return {
      environment: this.configService.get<string>('NODE_ENV') || null,
      name: this.configService.get<string>('APP_NAME') || null,
      version: this.configService.get<string>('VERSION') || null,
    };
  }
}
