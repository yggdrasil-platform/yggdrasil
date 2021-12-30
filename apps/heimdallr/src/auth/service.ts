import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

// Enums
import { AuthMessagePattern, Providers } from '@app/common/enums';

// Interfaces
import {
  IAuthenticatePayload,
  ICreateAuthenticationPayload,
} from '@app/common/interfaces';

// Models
import { Authentication, Session } from '@app/common/models';

@Injectable()
export default class AuthService {
  constructor(
    @Inject(Providers.AuthClient)
    private readonly authClient: ClientProxy,
  ) {}

  public async authenticate(input: IAuthenticatePayload): Promise<boolean> {
    return await firstValueFrom(
      this.authClient.send<boolean, IAuthenticatePayload>(
        AuthMessagePattern.Authenticate,
        input,
      ),
    );
  }

  public async createAuthentication(
    input: ICreateAuthenticationPayload,
  ): Promise<Authentication> {
    return await firstValueFrom(
      this.authClient.send<Authentication, ICreateAuthenticationPayload>(
        AuthMessagePattern.CreateAuthentication,
        input,
      ),
    );
  }

  public async createSession(userId: number): Promise<Session> {
    return await firstValueFrom(
      this.authClient.send<Session, number>(
        AuthMessagePattern.CreateSession,
        userId,
      ),
    );
  }

  public async verifySession(accessToken: string): Promise<Session | null> {
    return await firstValueFrom(
      this.authClient.send<Session, string>(
        AuthMessagePattern.VerifySession,
        accessToken,
      ),
    );
  }
}
