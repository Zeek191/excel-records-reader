import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

export default function Button({
  children,
  disabled,
  onClick,
}: JSX.IntrinsicElements["button"]) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        "py-5 w-full text-white duration-200 rounded-xl",
        disabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-sky-500 focus:bg-sky-700 focus:duration-200"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
