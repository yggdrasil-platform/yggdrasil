import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

// DTOs
import { CreateUserDTO } from '@app/common/dtos';

// Enums
import { Providers, UserMessagePatterns } from '@app/common/enums';

// Models
import { User } from '@app/common/models';

@Injectable()
export default class UsersService {
  constructor(
    @Inject(Providers.UserClient) private readonly usersClient: ClientProxy,
  ) {}

  public async create(input: CreateUserDTO): Promise<User> {
    return await firstValueFrom(
      this.usersClient.send<User, CreateUserDTO>(
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
