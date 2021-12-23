import { Controller, Get } from '@nestjs/common';

// Enums
import { Routes } from '@app/common/enums';

// Services
import HealthCheckService from './service';

// Types
import { HealthCheck } from './types';

@Controller(Routes.Health)
export default class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  async get(): Promise<HealthCheck> {
    return this.healthCheckService.get();
  }
}
