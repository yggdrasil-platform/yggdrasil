import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Redis } from 'ioredis';

// Enums
import { Providers } from '@app/common/enums';

// Enums
import { Session } from '@app/common/models';

@Injectable()
export default class SessionsService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(Providers.RedisClient)
    private readonly redisClient: Redis,
  ) {}

  public async create(userId: number): Promise<Session> {
    const now: number = Math.round(new Date().getTime() / 1000); // now in seconds
    const expiresIn: number = 2630000; // one month in seconds
    const sessionId: number = 1;
    const accessToken: string = this.jwtService.sign({
      exp: now + expiresIn,
      gty: 'password',
      iat: now,
      jti: sessionId,
      sub: userId,
    });

    return {
      accessToken,
      expiresIn,
      id: sessionId,
      tokenType: 'Bearer',
    };
  }
}
