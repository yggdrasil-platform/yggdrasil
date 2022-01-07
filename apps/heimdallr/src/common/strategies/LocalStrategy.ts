import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

// Models
import { User } from '@libs/common';

// Providers
import AuthService from '../../auth/service';
import UsersService from '../../user/service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  public async validate(username: string, password: string): Promise<User> {
    const user: User | null = await this.usersService.findByUsername(username);
    let isValid: boolean = false;

    if (!user) {
      throw new UnauthorizedException();
    }

    isValid = await this.authService.authenticate({
      password,
      userId: user.id,
    });

    if (!isValid) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
