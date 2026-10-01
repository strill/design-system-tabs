import type { ComponentProps } from "react";
import styles from "./Badge.module.scss";

export type BadgeVariant = "neutral" | "positive" | "negative";

export type BadgeProps = ComponentProps<"span"> & {
  /** Badge label. */
  children: string;
  /** Extra CSS classes, separated by spaces. */
  className?: string;
  /** Badge color variant. */
  variant?: BadgeVariant;
};

/** Short label for extra information, such as a status. */
export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={className ? `${styles.badge} ${className}` : styles.badge}
      data-variant={variant}
    />
  );
}
