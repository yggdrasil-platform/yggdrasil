import { Controller, Inject, Logger, LoggerService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Constants
import { USER_JWT_EXPIRES_IN } from '@app/common/constants';

// DTOs
import { JwtDTO } from './dtos';

// Enums
import { AuthMessagePattern } from '@app/common/enums';

// Interfaces
import { ITcpResponse } from '@app/common/interfaces';

// Models
import { Session } from '@app/common/models';

// Providers
import SessionsService from '../session/service';

@Controller()
export default class SessionsController {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(Logger) private readonly logger: LoggerService,
    private readonly sessionsService: SessionsService,
  ) {}

  private createJwt(
    userId: number,
    sessionId: number,
    expiresIn: number,
  ): string {
    const now: number = Math.round(new Date().getTime() / 1000); // now in seconds

    return this.jwtService.sign({
      exp: now + expiresIn,
      gty: 'password',
      iat: now,
      jti: sessionId,
      sub: userId,
    });
  }

  @MessagePattern(AuthMessagePattern.CreateSession)
  public async create(
    @Payload() userId: number,
  ): Promise<ITcpResponse<Session | null>> {
    const expiresIn: number = USER_JWT_EXPIRES_IN;
    const sessionId: number = await this.sessionsService.incrementId();
    const accessToken: string = this.createJwt(userId, sessionId, expiresIn);

    try {
      return [
        null,
        await this.sessionsService.create({
          access_token: accessToken,
          expires_in: expiresIn.toString(),
          id: sessionId,
          token_type: 'Bearer',
          user_id: userId.toString(),
        }),
      ];
    } catch (error) {
      this.logger.error(error);

      return [null, null];
    }
  }

  @MessagePattern(AuthMessagePattern.VerifySession)
  public async verify(
    @Payload() token: string,
  ): Promise<ITcpResponse<Session | null>> {
    try {
      const decodedToken: JwtDTO = this.jwtService.verify<JwtDTO>(token);

      return [
        null,
        (await this.sessionsService.findById(decodedToken.jti)) || null,
      ];
    } catch (error) {
      this.logger.error(error);

      return [null, null];
    }
  }
}
