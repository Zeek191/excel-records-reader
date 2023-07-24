import { PropsWithChildren } from "react";
import { LinkProps as NextLinkProps } from "next/link";

export interface LinkProps extends PropsWithChildren<NextLinkProps> {
  activeLink: string;
}
