import { hash } from 'bcrypt';
import { BeforeInsert, Column, Entity } from 'typeorm';

// Constants
import { SALT_ROUNDS } from '../constants';

// Models
import BaseModel from './BaseModel';

@Entity()
export default class Authentication extends BaseModel {
  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
    unique: true,
  })
  userId: string;

  @BeforeInsert()
  async setPassword(password: string) {
    this.password = await hash(password || this.password, SALT_ROUNDS);
  }
}
