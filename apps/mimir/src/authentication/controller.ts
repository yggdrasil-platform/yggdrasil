import {
  Controller,
  Inject,
  Logger,
  LoggerService,
  UnprocessableEntityException,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Enums
import { AuthMessagePattern } from '@app/common/enums';

// Interfaces
import {
  IAuthenticatePayload,
  ICreateAuthenticationPayload,
  ITcpResponse,
} from '@app/common/interfaces';

// Models
import { Authentication } from '@app/common/models';

// Providers
import AuthenticationsService from './service';

// Utils
import { getTcpError } from '@app/common/utils';

@Controller()
export default class AuthenticationController {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private readonly authenticationsService: AuthenticationsService,
  ) {}

  @MessagePattern(AuthMessagePattern.Authenticate)
  public async authenticate(
    @Payload() input: IAuthenticatePayload,
  ): Promise<ITcpResponse<boolean>> {
    try {
      return [null, await this.authenticationsService.authenticate(input)];
    } catch (error) {
      this.logger.error(error);

      return [null, false];
    }
  }

  @MessagePattern(AuthMessagePattern.CreateAuthentication)
  public async create(
    @Payload() input: ICreateAuthenticationPayload,
  ): Promise<ITcpResponse<Authentication | null>> {
    try {
      return [null, await this.authenticationsService.create(input)];
    } catch (error) {
      this.logger.error(error);

      return [getTcpError(new UnprocessableEntityException()), null];
    }
  }
}
