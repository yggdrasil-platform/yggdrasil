import { Entity, Column } from 'typeorm';

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
}
