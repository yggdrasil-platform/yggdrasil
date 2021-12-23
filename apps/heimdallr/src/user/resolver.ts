import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

// Models.
import { User } from './models';

// Providers
import UserService from './service';

@Resolver((of: void | undefined) => User)
export default class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => User)
  async me(@Args('id') id: string): Promise<User> {
    const user: User | null = await this.userService.findOneById(id);

    if (!user) {
      throw new NotFoundException(id);
    }

    return user;
  }
}
