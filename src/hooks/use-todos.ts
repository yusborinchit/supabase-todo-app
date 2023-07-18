import { useState } from "react";
import { v4 as uuid } from "uuid";
import { type TodoWithId, type Todo } from "@/types";

export function useTodos() {
  const [todos, setTodos] = useState<TodoWithId[]>([]);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: uuid(),
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const toggleTodo = (id: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id !== id) return todo;

      const newTodo = {
        ...todo,
        isChecked: !todo.isChecked,
      };

      return newTodo;
    });

    setTodos(newTodos);
  };

  return { todos, addTodo, deleteTodo, toggleTodo };
}
