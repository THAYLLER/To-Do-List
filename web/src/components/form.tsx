import React from "react";
import { useState } from "react";
import { gql, useMutation } from '@apollo/client';
import { v4 } from "uuid";
import { useRouter } from 'next/router'

import Checkbox from "./checkbox";

//export default function Form({ reloadTodos }) {
export default function Form() {
  const [text, setText] = useState("");
  const CREATE = gql`
    mutation Create($data: CreateItemToDoImput!) {
      create(data: $data) {
        id
        description
        isComplete
      }
    }
  `
  const [create] = useMutation(CREATE);
  const router = useRouter();

  const createTodo = async (event: any) => {
    event.preventDefault();

    if (!text) return;

    await create({
      variables: {
        data: {
          id: `${v4()}`,
          description: text,
          isComplete: false
        }
      }
    }).then(() => {
      setText("")
      router.reload()
    });
  };

  return (
    <form
      className="w-full flex items-center bg-white dark:bg-gray-800 rounded-md max-w-md mx-auto px-7 mt-7 sm:mt-12 h-10 sm:h-12 space-x-1"
      onSubmit={createTodo}
    >
      <Checkbox disabled />
      <input
        type="text"
        className="flex-1 border-none text-xs sm:text-base bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-0"
        placeholder="Create a new todo..."
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
    </form>
  );
}
