import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';

// Interfaces
import {
  ICreateAuthenticationPayload,
  IAuthenticatePayload,
} from '@app/common/interfaces';

// Models
import { Authentication } from '@app/common/models';

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
    const entity: Authentication = await this.authenticationRepository.create(
      input,
    );

    return await this.authenticationRepository.save(entity);
  }
}
