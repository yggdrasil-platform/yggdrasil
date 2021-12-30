import {
  Controller,
  Inject,
  Logger,
  LoggerService,
  UnprocessableEntityException,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Enums
import { UserMessagePatterns } from '@app/common/enums';

// Interfaces
import { ICreateUserPayload, ITcpResponse } from '@app/common/interfaces';

// Models
import { User } from '@app/common/models';

// Providers
import UserService from './service';

@Controller()
export default class UsersController {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private readonly userService: UserService,
  ) {}

  @MessagePattern(UserMessagePatterns.Create)
  public async create(
    @Payload() input: ICreateUserPayload,
  ): Promise<ITcpResponse<User | null>> {
    try {
      return [null, await this.userService.create(input)];
    } catch (error) {
      this.logger.error(error);

      return [new UnprocessableEntityException(), null];
    }
  }

  @MessagePattern(UserMessagePatterns.FindById)
  public async findById(
    @Payload() id: number,
  ): Promise<ITcpResponse<User | null>> {
    try {
      return [null, (await this.userService.findById(id)) || null];
    } catch (error) {
      this.logger.error(error);

      return [null, null];
    }
  }

  @MessagePattern(UserMessagePatterns.FindByUsername)
  public async findByUsername(
    @Payload() username: string,
  ): Promise<ITcpResponse<User | null>> {
    try {
      return [null, (await this.userService.findByUsername(username)) || null];
    } catch (error) {
      this.logger.error(error);

      return [null, null];
    }
  }
}
