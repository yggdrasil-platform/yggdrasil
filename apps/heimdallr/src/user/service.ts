import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

// Enums
import { Providers, UserMessagePatterns } from '@app/common/enums';

// Interfaces
import { ICreateUserPayload } from '@app/common/interfaces';

// Models
import { User } from '@app/common/models';

@Injectable()
export default class UsersService {
  constructor(
    @Inject(Providers.UserClient) private readonly usersClient: ClientProxy,
  ) {}

  public async create(input: ICreateUserPayload): Promise<User> {
    return await firstValueFrom(
      this.usersClient.send<User, ICreateUserPayload>(
        UserMessagePatterns.Create,
        input,
      ),
    );
  }

  public async findById(id: number): Promise<User | null> {
    let user: User | undefined;

    try {
      user = await firstValueFrom(
        this.usersClient.send<User | undefined, number>(
          UserMessagePatterns.FindById,
          id,
        ),
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
        this.usersClient.send<User | undefined, string>(
          UserMessagePatterns.FindByUsername,
          username,
        ),
      );
    } catch (error) {
      return null;
    }

    return user || null;
  }
}
