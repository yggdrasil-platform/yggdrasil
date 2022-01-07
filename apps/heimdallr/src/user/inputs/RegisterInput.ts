import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

// Interfaces
import { ICreateUserPayload } from '@libs/common/interfaces';

@InputType()
export default class RegisterInput implements ICreateUserPayload {
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

  @Field({
    description: `The user's password`,
  })
  @IsNotEmpty()
  password: string;

  @Field({
    description: `The user's username`,
  })
  @IsNotEmpty()
  @MaxLength(255)
  username: string;
}
