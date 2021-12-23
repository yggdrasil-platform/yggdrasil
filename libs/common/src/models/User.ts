import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class User {
  @Field({
    description: `The user's first name`,
  })
  firstName: string;

  @Field({
    description: `The user's last name`,
  })
  lastName: string;
}
