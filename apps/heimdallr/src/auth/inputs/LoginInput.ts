import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export default class LoginInput {
  @Field({
    description: `The user's password`,
  })
  @IsNotEmpty()
  password: string;

  @Field({
    description: `The user's username`,
  })
  @IsNotEmpty()
  username: string;
}
