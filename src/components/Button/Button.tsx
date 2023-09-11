import { ReactNode } from "react";
import styles from "./button.module.css";

interface ButtonProps {
  color?: "primary" | "secondary" | "none";
  type?: "default" | "icon" | "text";
  size?: "small" | "medium" | "large";

  children?: ReactNode;
  className?: string;
  [index: string]: unknown;
}

export default function Button({
  color = "primary",
  type = "default",
  size = "medium",
  children = null,
  className = "",
  ...rest
}: ButtonProps) {
  const classList: string[] = [styles.button];

  if (color === "primary") classList.push(styles.primary);
  else if (color === "secondary") classList.push(styles.secondary);

  classList.push(styles[type]);
  classList.push(styles[size]);
  classList.push(className);

  return (
    <button className={classList.join(" ")} {...rest}>
      {children}
    </button>
  );
}
