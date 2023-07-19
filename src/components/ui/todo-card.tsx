import { type TodoWithId } from "@/types";
import TrashIcon from "../icons/trash-icon";

interface TodoCardProps {
  todo: TodoWithId;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TodoCard({
  todo: { id, todo, isChecked },
  onToggle,
  onDelete,
}: TodoCardProps) {
  return (
    <li className="flex items-center w-full gap-4 px-4 border rounded border-zinc-200 bg-zinc-100">
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={() => onToggle(id)}
        className="rounded cursor-pointer border-zinc-500 accent-blue-500 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-500 peer"
      />
      <label
        htmlFor={id}
        className="w-full py-4 break-all cursor-pointer break-before-all peer-checked:line-through"
      >
        {todo}
      </label>
      <button
        onClick={() => onDelete(id)}
        className="text-red-500 hover:text-red-700 place-items-center"
      >
        <TrashIcon />
      </button>
    </li>
  );
}

export default TodoCard;
