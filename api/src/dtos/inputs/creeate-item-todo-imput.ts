import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateItemToDoImput {
  @Field()
  id: string;

  @Field()
  description: string;

  @Field()
  isComplete: boolean;
}
