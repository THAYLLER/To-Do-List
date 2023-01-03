import Head from 'next/head'
import { DragDropContext, Draggable, Droppable, resetServerContext } from "react-beautiful-dnd";
import { gql } from '@apollo/client';

import Form from '../components/form'
import ToggleThemeButton from '../components/toggle-theme-button'
import Todo from '../components/todo';

import { client } from '../services/apollo';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<any>()

  useEffect(() => {
    const load = async () => {
      const { data } = await client.query({
        query: gql`
          query Query {
            list {
              id
              description
              isComplete
            }
          }
        `
      });

      setData(data.list)
    }

    !data && load()
  }, [data])


  return (
    <>
      <Head>
        <title>Lista de Tarefas</title>
      </Head>
      <div className="flex flex-col font-body min-h-screen">
        <header className="bg-mobile-light dark:bg-mobile-dark sm:bg-desktop-light sm:dark:bg-desktop-dark bg-cover bg-center min-h-[200px] sm:min-h-[300px]">
          <section
            className={`flex flex-col justify-between max-w-md mx-auto px-6 py-10 sm:py-16`}
          >
            <div className="flex justify-between">
              <h1 className="text-xl sm:text-3xl text-white font-bold tracking-[0.625rem]">
                Lista de Tarefas
              </h1>
              <ToggleThemeButton />
            </div>
            <Form />
          </section>
        </header>
        <main className="flex-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <section
          className={`flex flex-col justify-between max-w-md mx-auto px-6 py-10 sm:py-16`}
        >
          {data && (
              <DragDropContext onDragEnd={() => {}}>
                <Droppable droppableId="todos">
                  {(provided) => (
                    <ul
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="-mt-16 sm:-mt-28 rounded-t-md overflow-hidden"
                    >
                      {data.map((todo: any, index: number) => (
                        <Draggable
                          key={todo.id}
                          draggableId={todo.id}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Todo todo={todo}  />
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            )}
        </section>
        </main>
      </div>
    </>
  )
}
