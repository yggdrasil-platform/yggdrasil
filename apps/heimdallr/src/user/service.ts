import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

// Enums
import { Providers, UserMessagePatterns } from '@app/common/enums';

// Interfaces
import { ICreateUserPayload } from '@app/common/interfaces';

// Models
import { User } from '@app/common/models';

// Utils
import { sendRequest } from '@app/common/utils';

@Injectable()
export default class UsersService {
  constructor(
    @Inject(Providers.UserClient) private readonly usersClient: ClientProxy,
  ) {}

  public async create(input: ICreateUserPayload): Promise<User> {
    const user: User | null = await sendRequest<
      ICreateUserPayload,
      User | null
    >(this.usersClient, UserMessagePatterns.Create, input);

    if (!user) {
      throw new UnprocessableEntityException();
    }

    return user;
  }

  public async findById(id: number): Promise<User | null> {
    return await sendRequest<number, User | null>(
      this.usersClient,
      UserMessagePatterns.FindById,
      id,
    );
  }

  public async findByUsername(username: string): Promise<User | null> {
    return await sendRequest<string, User | null>(
      this.usersClient,
      UserMessagePatterns.FindByUsername,
      username,
    );
  }
}
