import type { ReactNode } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
};

function Button({ variant = "primary", size = "md", children }: ButtonProps) {
  return <button className={`btn btn-${variant} btn-${size}`}>{children}</button>;
}
export default Button;
