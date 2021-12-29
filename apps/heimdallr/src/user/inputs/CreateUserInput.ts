import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

// DTOs
import { CreateUserDTO } from '@app/common/dtos';

@InputType()
export default class CreateUserInput implements CreateUserDTO {
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
