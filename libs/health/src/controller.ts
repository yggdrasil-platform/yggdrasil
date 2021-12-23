import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Enums
import { DefaultMessagePatterns } from '@app/common/enums';

// Interfaces
import { IHealth } from '@app/common/interfaces';

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
