import { PropsWithChildren } from "react";

export interface WrapperProps extends PropsWithChildren {
  column?: boolean;
  centerContent?: boolean;
  fullHeight?: boolean;
  fullWidth?: boolean;
  withBorder?: boolean;
}
