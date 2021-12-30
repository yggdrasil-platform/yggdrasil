import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

// Inputs
import { RegisterInput } from './inputs';

// Models
import { User } from '@app/common/models';

// Providers
import AuthenticationsService from '../auth/service';
import UsersService from './service';

@Resolver(() => User)
export default class UsersResolver {
  constructor(
    private readonly authenticationsService: AuthenticationsService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => User)
  public async register(
    @Args('input') { password, ...input }: RegisterInput,
  ): Promise<User> {
    const user: User = await this.usersService.create(input);

    await this.authenticationsService.createAuthentication({
      password,
      userId: user.id,
    });

    return user;
  }

  @Query(() => User)
  public async me(@Args('id') id: number): Promise<User> {
    const user: User | null = await this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException(id);
    }

    return user;
  }
}
