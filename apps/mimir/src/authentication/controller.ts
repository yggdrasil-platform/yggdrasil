import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Enums
import { AuthenticationMessagePattern } from '@app/common/enums';

// Inputs
import { AuthenticateDTO } from '@app/common/dtos';

// Providers
import AuthenticationsService from './service';

@Controller()
export default class AuthenticationController {
  constructor(
    private readonly authenticationsService: AuthenticationsService
  ) {}

  @MessagePattern(AuthenticationMessagePattern.Authenticate)
  public async authenticate(
    @Payload() input: AuthenticateDTO
  ): Promise<boolean> {
    return await this.authenticationsService.authenticate(input);
  }
}
