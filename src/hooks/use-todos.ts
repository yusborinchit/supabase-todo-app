import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { type TodoWithId, type Todo } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";

export function useTodos() {
  const [todos, setTodos] = useState<TodoWithId[]>([]);
  const { supabaseClient, session } = useSessionContext();

  useEffect(() => {
    if (!session) return;

    const getTodos = async () => {
      const { data, error } = await supabaseClient
        .from("todos")
        .select("id, todo, is_checked");

      if (!data || error) return;

      const todos = data.map(({ id, todo, is_checked }) => ({
        id,
        todo,
        isChecked: is_checked,
      })) as TodoWithId[];

      setTodos(todos);
    };

    getTodos();
  }, [supabaseClient, session]);

  const addTodo = async (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: uuid(),
    };

    const prevTodos = todos;
    setTodos((prevTodos) => [...prevTodos, newTodo]);

    if (!session) return;

    const { error } = await supabaseClient.from("todos").insert({
      id: newTodo.id,
      user_id: session.user.id,
      todo: newTodo.todo,
      is_checked: newTodo.isChecked,
    });
    if (!error) return;

    setTodos(prevTodos);
  };

  const deleteTodo = async (id: string) => {
    const prevTodos = todos;

    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);

    if (!session) return;

    const { error } = await supabaseClient.from("todos").delete().eq("id", id);

    if (!error) return;

    setTodos(prevTodos);
  };

  const toggleTodo = async (id: string) => {
    const prevTodos = todos;
    let isChecked = false;

    const newTodos = todos.map((todo) => {
      if (todo.id !== id) return todo;

      isChecked = todo.isChecked;
      const newTodo = {
        ...todo,
        isChecked: !todo.isChecked,
      };

      return newTodo;
    });
    setTodos(newTodos);

    if (!session) return;

    const { error } = await supabaseClient
      .from("todos")
      .update({ is_checked: !isChecked })
      .eq("id", id);

    if (!error) return;

    setTodos(prevTodos);
  };

  return { todos, addTodo, deleteTodo, toggleTodo };
}
