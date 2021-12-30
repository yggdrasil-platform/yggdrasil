import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Enums
import { AuthMessagePattern } from '@app/common/enums';

// Inputs
import {
  CreateAuthenticationDTO,
  ValidateAuthenticationDTO,
} from '@app/common/dtos';

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
    @Payload() input: CreateAuthenticationDTO,
  ): Promise<Authentication> {
    return await this.authenticationsService.create(input);
  }

  @MessagePattern(AuthMessagePattern.ValidateAuthentication)
  public async validate(
    @Payload() input: ValidateAuthenticationDTO,
  ): Promise<boolean> {
    return await this.authenticationsService.validate(input);
  }
}
