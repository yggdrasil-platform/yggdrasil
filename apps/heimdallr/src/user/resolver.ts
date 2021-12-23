import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

// Models
import { User } from '@app/common/models';

// Providers
import UsersService from './service';

@Resolver((of: void | undefined) => User)
export default class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query((returns) => User)
  async me(@Args('id') id: string): Promise<User> {
    const user: User | null = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException(id);
    }

    return user;
  }
}
