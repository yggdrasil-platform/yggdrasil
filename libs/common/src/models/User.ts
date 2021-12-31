import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export default class User {
  @Field({
    description: `The user's first name`,
  })
  @Column()
  firstName: string;

  @Field(() => ID, {
    description: `The user's identifier`,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({
    description: `The user's last name`,
  })
  @Column()
  lastName: string;

  @Field({
    description: `The user's unique username`,
  })
  @Column({
    nullable: false,
    unique: true,
  })
  @Index()
  username: string;
}
