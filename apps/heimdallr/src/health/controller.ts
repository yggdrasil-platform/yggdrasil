import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

// Enums
import { Routes } from '@libs/common/enums';

// Interfaces
import { IHealth } from '@libs/common/interfaces';

// Services
import HealthService from './service';

@Controller()
export default class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @HealthCheck()
  @Get(Routes.Health)
  async get(): Promise<IHealth[]> {
    return this.healthService.get();
  }
}
