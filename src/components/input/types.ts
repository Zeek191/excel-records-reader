export interface InputBase {
  label?: string;
  error?: boolean;
}

export type InputProps = JSX.IntrinsicElements["input"] & InputBase;
