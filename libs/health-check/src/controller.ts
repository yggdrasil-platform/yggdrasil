import { Controller, Get } from '@nestjs/common';

// Enums
import { Routes } from '@app/common';

// Interfaces
import { Healthcheck } from './interfaces';

// Services
import HealthCheckService from './service';

@Controller(Routes.HealthCheck)
export default class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  async get(): Promise<Healthcheck> {
    return this.healthCheckService.get();
  }
}
