import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

// Enums
import { Providers, UserMessagePatterns } from '@app/common/enums';

// Models
import { User } from '@app/common/models';

@Injectable()
export default class UsersService {
  constructor(@Inject(Providers.User) private userClient: ClientProxy) {}

  async findById(id: string): Promise<User | null> {
    return await firstValueFrom(
      this.userClient.send<User | null, string>(
        UserMessagePatterns.FindById,
        id
      )
    );
  }
}
