import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router'

import Checkbox from "./checkbox";
import CrossIcon from "../icons/cross";

export default function Todo({ todo }: any) {
  const UPDATE = gql`
    mutation Update($updateId: String!, $data: UpdateItemToDoImput!) {
      update(id: $updateId, data: $data) {
        isComplete
      }
    }
  `
  const DELETE = gql`
    mutation Delete($deleteId: String!) {
      delete(id: $deleteId) {
        id
        description
        isComplete
      }
    }
  `
  const router = useRouter();
  const [update] = useMutation(UPDATE);
  const [Delete] = useMutation(DELETE);

  const toggleCompleted = async () => {
    await update({
      variables: {
        updateId: todo.id,
        data: {
          isComplete: !todo.isComplete
        }
      }
    });

    router.reload();
  };

  const deleteTodo = () => {
    Delete({
      variables: {
        deleteId: todo.id
      }
    });

    router.reload();
  };

  return (
    <div className="flex justify-between space-x-3 bg-white dark:bg-gray-800 shadow-sm py-4 px-6 border-b dark:border-gray-700">
      <Checkbox disabled={false} completed={todo.isComplete} toggleCompleted={toggleCompleted} />
      <p
        className={`flex-1 text-sm text-gray-900 dark:text-gray-100 ${
          todo.isComplete && "line-through text-gray-400 dark:text-gray-500"
        }`}
      >
        {todo.description}
      </p>
      <button
        aria-label="Delete Todo"
        className="focus:outline-none"
        type="button"
        onClick={deleteTodo}
        id={todo.id}
      >
        <CrossIcon />
      </button>
    </div>
  );
}
