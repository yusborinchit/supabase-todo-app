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
    <li className="flex items-center w-full gap-4 px-4 py-2">
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={() => onToggle(id)}
        className="border-blue-500 rounded cursor-pointer accent-blue-500 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-500 peer"
      />
      <label
        htmlFor={id}
        className="w-full break-all cursor-pointer break-before-all peer-checked:text-gray-400 peer-checked:line-through"
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
