import clsx from "clsx";
import { InputProps } from "./types";

export default function Input({
  id,
  label,
  disabled,
  error,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col mb-6">
      <label
        htmlFor={id}
        className={clsx(
          "font-bold",
          disabled && "text-gray-400",
          error && "text-red-600"
        )}
      >
        {label}
      </label>
      <input
        {...props}
        disabled={disabled}
        className={clsx(
          "px-1 py-4 border-b-2",
          "disabled:bg-gray-200 disabled:border-b-gray-300 disabled:cursor-not-allowed disabled:text-gray-400",
          "focus:outline-none",
          error
            ? "border-b-red-600 bg-red-100"
            : "border-b-sky-200 bg-transparent",
          error ? "focus:border-b-red-600" : "focus:border-b-sky-400"
        )}
      />
    </div>
  );
}
