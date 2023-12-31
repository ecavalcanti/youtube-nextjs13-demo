import { Todo } from '@/typings'
import React from 'react'
import { notFound } from 'next/navigation'

type PageProps = {
  params: {
    todoId: string
  }
}

const fetchTodo = async (todoId: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, { next : { revalidate: 60}});
  const todo: Todo = await res.json();
  return todo;
}

export default async function TodoPage({ params: { todoId }}: PageProps) {

  const todo = await fetchTodo(todoId);

  if (!todo.id) return notFound();

  return (
    <div className="p-10 bg-yellow-200 border-2 m-2 shadow-lg">
      <p>
        #{todo.id}: {todo.title}
      </p>
      <p>Completed: {todo.completed ? 'Yes': 'No'}</p>

      <p className="border-t border-black mt-5 text-right">
        By user: {todo.userId}
      </p>
    </div>
  )
}
