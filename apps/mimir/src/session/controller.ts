import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// DTOs
import { JwtDTO } from './dtos';

// Enums
import { AuthMessagePattern } from '@app/common/enums';

// Models
import { Session } from '@app/common/models';

// Providers
import SessionsService from '../session/service';
import { JwtService } from '@nestjs/jwt';

@Controller()
export default class SessionsController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionsService: SessionsService,
  ) {}

  private createJwt(
    userId: number,
    sessionId: number,
    expiresIn: number = 2630000, // one month in seconds
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
  public async create(@Payload() userId: number): Promise<Session> {
    const expiresIn: number = 2630000;
    const sessionId: number = await this.sessionsService.incrementId();
    const accessToken: string = this.createJwt(userId, sessionId, expiresIn);

    return await this.sessionsService.create({
      access_token: accessToken,
      expires_in: expiresIn.toString(),
      id: sessionId,
      token_type: 'Bearer',
      user_id: userId.toString(),
    });
  }

  @MessagePattern(AuthMessagePattern.VerifySession)
  public async verify(@Payload() token: string): Promise<Session | undefined> {
    const decodedToken: JwtDTO = this.jwtService.verify<JwtDTO>(token);

    return await this.sessionsService.findById(decodedToken.jti);
  }
}
