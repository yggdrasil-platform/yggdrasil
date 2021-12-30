import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Redis } from 'ioredis';

// DTOs
import { SessionDTO } from './dtos';

// Enums
import { Providers } from '@app/common/enums';

// Models
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
    const tokenType: string = 'Bearer';
    const sessionId: number = await this.redisClient.incr('session');
    const key: string = `session:${sessionId}`;
    const accessToken: string = this.jwtService.sign({
      exp: now + expiresIn,
      gty: 'password',
      iat: now,
      jti: sessionId,
      sub: userId,
    });
    const session: SessionDTO = {
      access_token: accessToken,
      expires_in: expiresIn.toString(),
      token_type: tokenType,
    };

    try {
      await Promise.all([
        ...Object.keys(session).map(
          async (value) =>
            await this.redisClient.hset(key, value, session[value]),
        ),
        await this.redisClient.expire(key, expiresIn),
      ]);
    } catch (error) {
      await this.redisClient.del(key);

      throw error;
    }

    return {
      accessToken,
      expiresIn,
      id: sessionId,
      tokenType,
    };
  }

  public async findById(id: number): Promise<Session | undefined> {
    const session: Record<string, string> = await this.redisClient.hgetall(
      `session:${id}`,
    );

    if (Object.keys(session).length < 1) {
      return undefined;
    }

    return {
      accessToken: session.access_token,
      expiresIn: parseInt(session.expires_in),
      id,
      tokenType: session.token_type,
    };
  }
}
