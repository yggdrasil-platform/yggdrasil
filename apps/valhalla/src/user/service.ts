import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Inputs
import { CreateUserInput } from '@app/common/inputs';

// Models
import { User } from '@app/common/models';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  public async create(input: CreateUserInput): Promise<User> {
    const entity: User = await this.userRepository.create(input);

    return await this.userRepository.save(entity);
  }

  public async findById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne(id);
  }
}
