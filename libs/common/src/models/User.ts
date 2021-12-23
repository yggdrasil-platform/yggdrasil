import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export default class User {
  @Field(() => ID, {
    description: `The user's identifier`,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({
    description: `The user's first name`,
  })
  @Column()
  firstName: string;

  @Field({
    description: `The user's last name`,
  })
  @Column()
  lastName: string;
}
