import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';

// Constants
import { SALT_ROUNDS } from '@libs/common/constants';

// Interfaces
import {
  ICreateAuthenticationPayload,
  IAuthenticatePayload,
} from '@libs/common/interfaces';

// Models
import { Authentication } from '@libs/common/models';

@Injectable()
export default class AuthenticationsService {
  constructor(
    @InjectRepository(Authentication)
    private readonly authenticationRepository: Repository<Authentication>,
  ) {}

  public async authenticate({
    password,
    userId,
  }: IAuthenticatePayload): Promise<boolean> {
    const entity: Authentication | undefined =
      await this.authenticationRepository.findOne({
        where: {
          userId,
        },
      });

    if (!entity) {
      return false;
    }

    return await compare(password, entity.password);
  }

  public async create(
    input: ICreateAuthenticationPayload,
  ): Promise<Authentication> {
    const hashedPassword: string = await hash(input.password, SALT_ROUNDS);
    const entity: Authentication = await this.authenticationRepository.create({
      ...input,
      password: hashedPassword,
    });

    return await this.authenticationRepository.save(entity);
  }
}
