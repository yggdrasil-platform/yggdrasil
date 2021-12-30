import { UnauthorizedException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

// Inputs
import { LoginInput } from './inputs';

// Models
import { Session, User } from '@app/common/models';

// Providers
import AuthService from './service';
import UsersService from '../user/service';

@Resolver()
export default class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => Session)
  public async login(
    @Args('input') { password, username }: LoginInput,
  ): Promise<Session> {
    const user: User | null = await this.usersService.findByUsername(username);
    let isValid: boolean = false;

    if (!user) {
      throw new UnauthorizedException();
    }

    isValid = await this.authService.validate({ password, userId: user.id });

    if (!isValid) {
      throw new UnauthorizedException();
    }

    return await this.authService.createSession(user.id);
  }
}
