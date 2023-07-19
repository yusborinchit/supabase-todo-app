import { useTodos } from "@/hooks/use-todos";
import TodoCard from "./todo-card";
import TodoInput from "./todo-input";
import { useMemo, type FormEvent } from "react";

function TodosList() {
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodos();

  const uncheckedTodos = useMemo(() => {
    return [...todos].filter((todo) => !todo.isChecked).length;
  }, [todos]);

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

      <div className="flex flex-col gap-2 pt-6">
        <p className="block text-xs text-zinc-500">
          <span className="font-bold">{uncheckedTodos}</span> Todos left
        </p>
        {todos.length <= 0 ? (
          <p className="p-4 border rounded text-zinc-500 border-zinc-200 bg-zinc-100">
            There is no todos!
          </p>
        ) : (
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
        )}
      </div>
    </section>
  );
}

export default TodosList;
