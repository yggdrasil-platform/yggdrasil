import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

// Enums
import { DefaultMessagePatterns } from '@libs/common/enums';

// Interfaces
import { IHealth } from '@libs/common/interfaces';

// Services
import HealthService from './service';

@Controller()
export default class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @MessagePattern(DefaultMessagePatterns.Health)
  async get(): Promise<IHealth> {
    return this.healthService.get();
  }
}
