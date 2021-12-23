import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export default class CreateUserInput {
  @Field({
    description: `The user's first name`,
  })
  @IsNotEmpty()
  @MaxLength(255)
  firstName: string;

  @Field({
    description: `The user's last name`,
  })
  @IsNotEmpty()
  @MaxLength(255)
  lastName: string;
}
