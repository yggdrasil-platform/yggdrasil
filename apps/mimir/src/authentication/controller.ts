import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Enums
import { AuthMessagePattern } from '@app/common/enums';

// Interfaces
import {
  ICreateAuthenticationPayload,
  IValidateAuthenticationPayload,
} from '@app/common/interfaces';

// Models
import { Authentication } from '@app/common/models';

// Providers
import AuthenticationsService from './service';

@Controller()
export default class AuthenticationController {
  constructor(
    private readonly authenticationsService: AuthenticationsService,
  ) {}

  @MessagePattern(AuthMessagePattern.CreateAuthentication)
  public async create(
    @Payload() input: ICreateAuthenticationPayload,
  ): Promise<Authentication> {
    return await this.authenticationsService.create(input);
  }

  @MessagePattern(AuthMessagePattern.ValidateAuthentication)
  public async validate(
    @Payload() input: IValidateAuthenticationPayload,
  ): Promise<boolean> {
    return await this.authenticationsService.validate(input);
  }
}
