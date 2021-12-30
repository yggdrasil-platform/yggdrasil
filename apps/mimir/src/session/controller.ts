import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Enums
import { AuthMessagePattern } from '@app/common/enums';

// Models
import { Session } from '@app/common/models';

// Providers
import SessionsService from '../session/service';

@Controller()
export default class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @MessagePattern(AuthMessagePattern.CreateSession)
  public async create(@Payload() userId: number): Promise<Session> {
    return await this.sessionsService.create(userId);
  }
}
