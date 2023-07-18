import { useTodos } from "@/hooks/use-todos";
import TodoCard from "./todo-card";
import TodoInput from "./todo-input";
import { type FormEvent } from "react";

function TodosList() {
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodos();

  const handleCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { currentTarget: form } = event;
    const formData = new FormData(form);

    const todo = formData.get("todo");

    if (!todo || typeof todo !== "string") return;
    form.reset();

    const newTodo = {
      todo,
      isChecked: false,
    };

    addTodo(newTodo);
  };

  const handleToggle = (id: string) => {
    toggleTodo(id);
  };

  const handleDelete = (id: string) => {
    deleteTodo(id);
  };

  return (
    <section className="flex flex-col max-w-lg gap-4 px-4 py-12 mx-auto">
      <TodoInput onCreate={handleCreate} />
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </section>
  );
}

export default TodosList;
