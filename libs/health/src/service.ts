import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

// Interfaces
import { IBaseEnvironmentVariables, IHealth } from '@libs/common/interfaces';

@Injectable()
export default class HealthService {
  constructor(
    private readonly configService: ConfigService<IBaseEnvironmentVariables>,
    private readonly database: TypeOrmHealthIndicator,
    private readonly health: HealthCheckService,
  ) {}

  async get(): Promise<IHealth> {
    return {
      environment: this.configService.get<string>('NODE_ENV') || null,
      health: await this.health.check([
        () => this.database.pingCheck('database'),
      ]),
      name: this.configService.get<string>('APP_NAME') || null,
      version: this.configService.get<string>('VERSION') || null,
    };
  }
}
