import { Arg, Query, Resolver, Mutation } from "type-graphql";
import { CreateItemToDoImput } from "../dtos/inputs/creeate-item-todo-imput";
import { UpdateItemToDoImput } from "../dtos/inputs/update-item-todo-imput";
import { ToDo } from "../dtos/models/todo-models";

@Resolver()
export class ToDoResolver {
  private  toDos: ToDo[] = [];

  @Query(() => [ToDo])
  async list() {
    return this.toDos;
  }

  @Mutation(() => ToDo)
  async create(@Arg('data') data: CreateItemToDoImput) {

    this.toDos.push(data);

    return data;
  }

  @Mutation(() => ToDo)
  async update(@Arg('data') data: UpdateItemToDoImput, @Arg('id') id: string) {

    for (let i = 0; i < this.toDos.length; i++) {
      if(this.toDos[i].id === id) {
        this.toDos[i].isComplete = data.isComplete
      }
    };
    
    return data;
  }

  @Mutation(() => [ToDo])
  async delete(@Arg('id') id: string) {
    if (this.toDos.length === 1) {
      this.toDos = []
    } else {

      for (let i = 0; i < this.toDos.length; i++) {
        this.toDos = this.toDos.filter(item => item.id !== id)
      };
    }

    return this.toDos;
  }
}
