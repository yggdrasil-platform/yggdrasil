import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

// Inputs
import { CreateUserInput } from '@app/common/inputs';

// Models
import { User } from '@app/common/models';

// Providers
import UsersService from './service';

@Resolver((of: void | undefined) => User)
export default class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation((returns) => User)
  public async createUser(
    @Args('input') input: CreateUserInput
  ): Promise<User> {
    return await this.userService.create(input);
  }

  @Query((returns) => User)
  public async me(@Args('id') id: number): Promise<User> {
    const user: User | null = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException(id);
    }

    return user;
  }
}
