import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// DTOs
import { CreateUserDTO } from '@app/common/dtos';

// Models
import { User } from '@app/common/models';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  public async create(input: CreateUserDTO): Promise<User> {
    const entity: User = await this.userRepository.create(input);

    return await this.userRepository.save(entity);
  }

  public async findById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne(id);
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      username,
    });
  }
}
