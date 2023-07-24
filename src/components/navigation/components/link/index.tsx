import clsx from "clsx";
import { default as NextLink } from "next/link";
import type { LinkProps } from "./types";

export default function Link({
  activeLink,
  children,
  href,
  ...props
}: LinkProps) {
  return (
    <NextLink
      href={href}
      {...props}
      className={clsx(
        "mx-5 relative text-center",
        "before:w-0 before:h-1  before:absolute before:-top-2 before:left-0 before:duration-200",
        "hover:before:w-1/2 hover:before:bg-gray-300",
        activeLink === href
          ? "before:w-full before:bg-sky-500"
          : "before:bg-gray-300"
      )}
    >
      {children}
    </NextLink>
  );
}
