import { useId } from "react";

interface InputProps {
  label: string;
  type: string;
  name: string;
  error: string;
}

function Input({ label, type, name, error }: InputProps) {
  const id = useId();

  return (
    <div data-error={!!error} className="flex flex-col group">
      <label
        htmlFor={id}
        className="relative block border rounded group-data-[error=true]:border-red-300 border-zinc-300 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-500 group-data-[error=true]:focus-within:ring-red-500 group-data-[error=true]:focus-within:border-red-600"
      >
        <input
          type={type}
          name={name}
          id={id}
          placeholder={label}
          className="w-full placeholder-transparent bg-transparent border-none rounded peer focus:border-transparent focus:outline-none focus:ring-0 group-data-[error=true]:text-red-500"
        />

        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-zinc-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs group-data-[error=true]:text-red-500 group-data-[error=true]:peer-focus:text-red-600">
          {label}
        </span>
      </label>
      {!!error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

export default Input;
