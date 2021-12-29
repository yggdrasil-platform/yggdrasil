import { Args, Query, Resolver } from '@nestjs/graphql';

// Inputs
import { AuthenticateInput } from './inputs';

// Providers
import AuthenticationsService from './service';

@Resolver()
export default class AuthenticationsResolver {
  constructor(
    private readonly authenticationsService: AuthenticationsService
  ) {}

  @Query(() => Boolean)
  public async authenticate(
    @Args('input') input: AuthenticateInput
  ): Promise<boolean> {
    return await this.authenticationsService.authenticate(input);
  }
}
