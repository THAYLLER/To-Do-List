import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ToDo {

  @Field()
  id: string;

  @Field()
  description: string;

  @Field()
  isComplete: boolean;
}
