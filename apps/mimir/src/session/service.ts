import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Redis } from 'ioredis';

// DTOs
import { SessionDTO } from './dtos';

// Enums
import { Providers, RedisKeys } from '@app/common/enums';

// Models
import { Session } from '@app/common/models';

@Injectable()
export default class SessionsService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(Providers.RedisClient)
    private readonly redisClient: Redis,
  ) {}

  public async create(session: SessionDTO & { id: number }): Promise<Session> {
    const key: string = `${RedisKeys.Session}:${session.id}`;

    try {
      await Promise.all([
        ...Object.keys(session).map(
          async (value) =>
            await this.redisClient.hset(key, value, session[value]),
        ),
        await this.redisClient.expire(key, parseInt(session.expires_in)),
      ]);
    } catch (error) {
      await this.redisClient.del(key);

      throw error;
    }

    return {
      accessToken: session.access_token,
      expiresIn: parseInt(session.expires_in),
      id: session.id,
      tokenType: session.token_type,
      userId: parseInt(session.user_id),
    };
  }

  public async findById(id: number): Promise<Session | undefined> {
    const session: Record<string, string> = await this.redisClient.hgetall(
      `${RedisKeys.Session}:${id}`,
    );

    if (Object.keys(session).length < 1) {
      return undefined;
    }

    return {
      accessToken: session.access_token,
      expiresIn: parseInt(session.expires_in),
      id,
      tokenType: session.token_type,
      userId: parseInt(session.user_id),
    };
  }

  public async incrementId(): Promise<number> {
    return await this.redisClient.incr(RedisKeys.Session);
  }
}
