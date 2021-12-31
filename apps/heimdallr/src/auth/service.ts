import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

// Enums
import { AuthMessagePattern, Providers } from '@app/common/enums';

// Interfaces
import {
  IAuthenticatePayload,
  ICreateAuthenticationPayload,
} from '@app/common/interfaces';

// Models
import { Authentication, Session } from '@app/common/models';

// Utils
import { sendRequest } from '@app/common/utils';

@Injectable()
export default class AuthService {
  constructor(
    @Inject(Providers.AuthClient)
    private readonly authClient: ClientProxy,
  ) {}

  public async authenticate(input: IAuthenticatePayload): Promise<boolean> {
    return await sendRequest<IAuthenticatePayload, boolean>(
      this.authClient,
      AuthMessagePattern.Authenticate,
      input,
    );
  }

  public async createAuthentication(
    input: ICreateAuthenticationPayload,
  ): Promise<Authentication> {
    const authentication: Authentication | null = await sendRequest<
      ICreateAuthenticationPayload,
      Authentication | null
    >(this.authClient, AuthMessagePattern.CreateAuthentication, input);

    if (!authentication) {
      throw new UnprocessableEntityException();
    }

    return authentication;
  }

  public async createSession(userId: string): Promise<Session> {
    const session: Session | null = await sendRequest<string, Session | null>(
      this.authClient,
      AuthMessagePattern.CreateSession,
      userId,
    );

    if (!session) {
      throw new UnprocessableEntityException();
    }

    return session;
  }

  public async verifySession(accessToken: string): Promise<Session | null> {
    return await sendRequest<string, Session | null>(
      this.authClient,
      AuthMessagePattern.VerifySession,
      accessToken,
    );
  }
}
