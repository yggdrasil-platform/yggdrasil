import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Enums
import { UserMessagePatterns } from '@app/common/enums';

// Interfaces
import { User } from '@app/common/models';

// Providers
import UserService from './service';

@Controller()
export default class UsersController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserMessagePatterns.FindById)
  async findById(@Payload() id: string): Promise<User | null> {
    return await this.userService.findById(id);
  }
}
