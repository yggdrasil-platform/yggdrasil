import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';

// Enums
import { HealthChecks } from '@libs/common/enums';

// Interfaces
import { IBaseEnvironmentVariables, IHealth } from '@libs/common/interfaces';

@Injectable()
export default class HealthService {
  constructor(
    private readonly configService: ConfigService<IBaseEnvironmentVariables>,
    private readonly mongodb: MongooseHealthIndicator,
    private readonly health: HealthCheckService,
  ) {}

  async get(): Promise<IHealth> {
    return {
      environment: this.configService.get<string>('NODE_ENV') || null,
      health: await this.health.check([
        () => this.mongodb.pingCheck(HealthChecks.MongoDB),
      ]),
      name: this.configService.get<string>('APP_NAME') || null,
      version: this.configService.get<string>('VERSION') || null,
    };
  }
}
