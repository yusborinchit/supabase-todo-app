import { type FormEvent } from "react";

interface TodoInputProps {
  onCreate: (event: FormEvent<HTMLFormElement>) => void;
}

function TodoInput({ onCreate }: TodoInputProps) {
  return (
    <form
      onSubmit={onCreate}
      className="flex w-full border rounded border-zinc-300 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-500"
    >
      <label htmlFor="todo" className="sr-only">
        Todo
      </label>
      <input
        type="text"
        name="todo"
        id="todo"
        placeholder="Take the dog for a walk..."
        className="w-full border-none rounded focus:border-transparent focus:outline-none focus:ring-0 placeholder:text-zinc-500"
      />
      <button
        type="submit"
        aria-label="Add todo"
        className="grid px-4 py-1 text-2xl leading-[100%] font-bold text-blue-500 place-items-center hover:text-blue-700"
      >
        +
      </button>
    </form>
  );
}

export default TodoInput;
