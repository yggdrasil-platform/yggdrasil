import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

// DTOs
import {
  CreateAuthenticationDTO,
  ValidateAuthenticationDTO,
} from '@app/common/dtos';

// Enums
import { AuthMessagePattern, Providers } from '@app/common/enums';

// Models
import { Authentication, Session } from '@app/common/models';

@Injectable()
export default class AuthService {
  constructor(
    @Inject(Providers.AuthClient)
    private readonly authClient: ClientProxy,
  ) {}

  public async createAuthentication(
    input: CreateAuthenticationDTO,
  ): Promise<Authentication> {
    return await firstValueFrom(
      this.authClient.send<Authentication, CreateAuthenticationDTO>(
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

  public async validate(input: ValidateAuthenticationDTO): Promise<boolean> {
    return await firstValueFrom(
      this.authClient.send<boolean, ValidateAuthenticationDTO>(
        AuthMessagePattern.ValidateAuthentication,
        input,
      ),
    );
  }
}
