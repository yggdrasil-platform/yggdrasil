import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Inputs
import {
  CreateAuthenticationDTO,
  ValidateAuthenticationDTO,
} from '@app/common/dtos';

// Models
import { Authentication } from '@app/common/models';

@Injectable()
export default class AuthenticationsService {
  constructor(
    @InjectRepository(Authentication)
    private readonly authenticationRepository: Repository<Authentication>,
  ) {}

  public async create(input: CreateAuthenticationDTO): Promise<Authentication> {
    const entity: Authentication = await this.authenticationRepository.create(
      input,
    );

    return await this.authenticationRepository.save(entity);
  }

  public async validate({
    password,
    userId,
  }: ValidateAuthenticationDTO): Promise<boolean> {
    const entity: Authentication | undefined =
      await this.authenticationRepository.findOne({
        where: {
          userId,
        },
      });

    return !!(entity && entity.password === password);
  }
}
