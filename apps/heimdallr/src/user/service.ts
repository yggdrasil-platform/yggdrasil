import { Injectable } from '@nestjs/common';

// Models
import { User } from './models';

@Injectable()
export default class MerchantsService {
  async findOneById(id: string): Promise<User | null> {
    return {
      firstName: 'Kieran',
      lastName: `O'Neill`,
    };
  }
}
