import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

// Models
import { User } from '@app/common';

// Providers
import AuthenticationsService from '../service';
import UsersService from '../../user/service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authenticationsService: AuthenticationsService,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  public async validate(username: string, password: string): Promise<any> {
    const user: User | null = await this.usersService.findByUsername(username);
    let isValid: boolean = false;

    if (!user) {
      throw new UnauthorizedException();
    }

    isValid = await this.authenticationsService.validate({
      password,
      userId: user.id,
    });

    if (!isValid) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
