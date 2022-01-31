import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

// Decorators
import { CurrentUser } from '../common/decorators';

// Guards
import { GqlAuthGuard } from '../common/guards';

// Inputs
import { RegisterInput } from './inputs';

// Models
import { Session, User } from '@libs/common/models';

// Providers
import AuthService from '../auth/service';
import UsersService from './service';

@Resolver(() => User)
export default class UsersResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => Session)
  public async register(
    @Args('input') { password, ...input }: RegisterInput,
  ): Promise<Session> {
    const user: User = await this.usersService.create(input);
    await this.authService.createAuthentication({
      password,
      userId: user._id,
    });

    return await this.authService.createSession(user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  public async me(@CurrentUser() user: User): Promise<User> {
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
