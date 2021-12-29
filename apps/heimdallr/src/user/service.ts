import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

// Enums
import { Providers, UserMessagePatterns } from '@app/common/enums';

// Inputs
import { CreateUserInput } from './inputs';

// Models
import { User } from '@app/common/models';

@Injectable()
export default class UsersService {
  constructor(@Inject(Providers.User) private userClient: ClientProxy) {}

  public async create(input: CreateUserInput): Promise<User> {
    return await firstValueFrom(
      this.userClient.send<User, CreateUserInput>(
        UserMessagePatterns.Create,
        input
      )
    );
  }

  public async findById(id: number): Promise<User | null> {
    let user: User | undefined;

    try {
      user = await firstValueFrom(
        this.userClient.send<User | undefined, number>(
          UserMessagePatterns.FindById,
          id
        )
      );
    } catch (error) {
      return null;
    }

    return user || null;
  }

  public async findByUsername(username: string): Promise<User | null> {
    let user: User | undefined;

    try {
      user = await firstValueFrom(
        this.userClient.send<User | undefined, string>(
          UserMessagePatterns.FindByUsername,
          username
        )
      );
    } catch (error) {
      return null;
    }

    return user || null;
  }
}
