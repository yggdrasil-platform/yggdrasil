import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { Model } from 'mongoose';

// Constants
import { SALT_ROUNDS } from '@libs/common/constants';

// Interfaces
import {
  IAuthenticatePayload,
  ICreateAuthenticationPayload,
  IDocumentModel,
} from '@libs/common/interfaces';

// Models
import { Authentication } from '@libs/common/models';

@Injectable()
export default class AuthenticationsService {
  constructor(
    @InjectModel(Authentication.name)
    private readonly authenticationModel: Model<IDocumentModel<Authentication>>,
  ) {}

  public async authenticate({
    password,
    userId,
  }: IAuthenticatePayload): Promise<boolean> {
    const document: IDocumentModel<Authentication> | null =
      await this.authenticationModel
        .findOne({
          userId,
        })
        .exec();

    if (!document) {
      return false;
    }

    return await compare(password, document.password);
  }

  public async create(
    input: ICreateAuthenticationPayload,
  ): Promise<Authentication> {
    const hashedPassword: string = await hash(input.password, SALT_ROUNDS);
    const now: Date = new Date();
    let document: IDocumentModel<Authentication> = new this.authenticationModel(
      {
        ...input,
        createdAt: now,
        password: hashedPassword,
        updatedAt: now,
      },
    );

    document = await document.save();

    return document.toObject();
  }
}
