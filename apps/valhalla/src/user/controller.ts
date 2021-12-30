import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Enums
import { UserMessagePatterns } from '@app/common/enums';

// Interfaces
import { ICreateUserPayload } from '@app/common/interfaces';

// Models
import { User } from '@app/common/models';

// Providers
import UserService from './service';

@Controller()
export default class UsersController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserMessagePatterns.Create)
  public async create(@Payload() input: ICreateUserPayload): Promise<User> {
    return await this.userService.create(input);
  }

  @MessagePattern(UserMessagePatterns.FindById)
  public async findById(@Payload() id: number): Promise<User | undefined> {
    return await this.userService.findById(id);
  }

  @MessagePattern(UserMessagePatterns.FindByUsername)
  public async findByUsername(
    @Payload() username: string,
  ): Promise<User | undefined> {
    return await this.userService.findByUsername(username);
  }
}
