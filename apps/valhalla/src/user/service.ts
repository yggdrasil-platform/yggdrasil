import { Injectable } from '@nestjs/common';

// Models
import { User } from '@app/common/models';

@Injectable()
export default class UsersService {
  async findById(id: string): Promise<User | null> {
    return {
      firstName: 'Kieran111111',
      lastName: `O'Neill`,
    };
  }
}
