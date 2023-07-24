import clsx from "clsx";
import { WrapperProps } from "./types";

export default function Wrapper({
  children,
  column = false,
  centerContent = false,
  fullHeight = false,
  fullWidth = false,
  withBorder = false,
}: WrapperProps) {
  return (
    <div
      className={clsx(
        "rounded-lg max-w-7xl p-5 flex justify-center items-center",
        column ? "flex-col" : "flex-row",
        withBorder && "border-2 rounded-sm border-sky-300",
        fullHeight && "h-screen",
        fullWidth && "w-full",
        centerContent && "mx-auto"
      )}
    >
      {children}
    </div>
  );
}
