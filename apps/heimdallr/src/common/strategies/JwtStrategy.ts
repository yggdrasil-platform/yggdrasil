import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-custom';

// Interfaces
import { IRequest } from '@libs/common/interfaces';

// Models
import { Session, User } from '@libs/common/models';

// Providers
import AuthService from '../../auth/service';
import UsersService from '../../user/service';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  public readonly name: string = 'jwt';

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  public async validate(request: IRequest): Promise<User> {
    const token: string | null =
      ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    let session: Session | null = null;
    let user: User | null = null;

    if (!token) {
      throw new UnauthorizedException();
    }

    session = await this.authService.verifySession(token);

    if (!session) {
      throw new UnauthorizedException();
    }

    user = await this.usersService.findById(session.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
