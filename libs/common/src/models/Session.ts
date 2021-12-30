import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class Session {
  @Field({
    description: 'A JWT to use with requests',
  })
  accessToken: string;

  @Field(() => Int, {
    description: 'The time in seconds this token will expire',
  })
  expiresIn: number;

  id: number;

  @Field({
    description: 'The type of token',
  })
  tokenType: 'Bearer';
}
