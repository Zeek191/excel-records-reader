import { ButtonHTMLAttributes } from "react";

export default function Button({
  children,
  onClick,
}: JSX.IntrinsicElements["button"]) {
  return (
    <button
      className="py-5 bg-sky-500 w-full rounded-sm max-w-sm text-white focus:bg-sky-700 focus:duration-200 duration-200"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
