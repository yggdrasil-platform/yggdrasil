import {
  Controller,
  Inject,
  Logger,
  LoggerService,
  UnprocessableEntityException,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Enums
import { UserMessagePatterns } from '@libs/common/enums';

// Interfaces
import { ICreateUserPayload, ITcpResponse } from '@libs/common/interfaces';

// Models
import { User } from '@libs/common/models';

// Providers
import UserService from './service';

// Utils
import { getTcpError } from '@libs/common/utils';

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

      return [getTcpError(new UnprocessableEntityException()), null];
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
