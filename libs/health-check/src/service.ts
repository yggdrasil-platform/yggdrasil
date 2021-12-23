import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';

// Interfaces
import { Healthcheck } from './interfaces';

@Injectable()
export default class HealthCheckService {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  async get(): Promise<Healthcheck> {
    return {
      environment: process.env.NODE_ENV || null,
      name: process.env.SERVICE_NAME || null,
      version: process.env.VERSION || null,
    };
  }
}
