import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

// DTOs
import { AuthenticateDTO } from '@app/common/dtos';

// Enums
import { AuthenticationMessagePattern, Providers } from '@app/common/enums';

// Inputs
import { AuthenticateInput } from './inputs';

// Models
import { User } from '@app/common/models';

// Providers
import { UsersService } from '../user';

@Injectable()
export default class AuthenticationsService {
  constructor(
    @Inject(Providers.Authentication)
    private readonly authenticationClient: ClientProxy,
    private readonly usersService: UsersService
  ) {}

  public async authenticate({
    password,
    username,
  }: AuthenticateInput): Promise<boolean> {
    const user: User | null = await this.usersService.findByUsername(username);

    if (!user) {
      return false;
    }

    return await firstValueFrom(
      this.authenticationClient.send<boolean, AuthenticateDTO>(
        AuthenticationMessagePattern.Authenticate,
        {
          password,
          userId: user.id,
        }
      )
    );
  }
}
