import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Inputs
import { AuthenticateDTO } from '@app/common/dtos';

// Models
import { Authentication } from '../common/models';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(Authentication)
    private readonly authenticationRepository: Repository<Authentication>
  ) {}

  public async authenticate({
    password,
    userId,
  }: AuthenticateDTO): Promise<boolean> {
    const entity: Authentication | undefined =
      await this.authenticationRepository.findOne({
        where: {
          userId,
        },
      });

    return !!(entity && entity.password === password);
  }
}
