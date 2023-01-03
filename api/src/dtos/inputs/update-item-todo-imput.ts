import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateItemToDoImput {

  @Field()
  isComplete: boolean;
}
