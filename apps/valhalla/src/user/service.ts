import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Interfaces
import { ICreateUserPayload, IDocumentModel } from '@libs/common/interfaces';

// Models
import { User } from '@libs/common/models';

@Injectable()
export default class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<IDocumentModel<User>>,
  ) {}

  public async create(input: ICreateUserPayload): Promise<User> {
    const now: Date = new Date();
    let document: IDocumentModel<User> = new this.userModel({
      ...input,
      createdAt: now,
      updatedAt: now,
    });

    document = await document.save();

    return document.toObject();
  }

  public async findById(id: string): Promise<User | null> {
    const document: IDocumentModel<User> | null = await this.userModel
      .findById(id)
      .exec();

    if (document) {
      return document.toObject();
    }

    return null;
  }

  public async findByUsername(username: string): Promise<User | null> {
    const document: IDocumentModel<User> | null = await this.userModel
      .findOne({
        username,
      })
      .exec();

    if (document) {
      return document.toObject();
    }

    return null;
  }
}
