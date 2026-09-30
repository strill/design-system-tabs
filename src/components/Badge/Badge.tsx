import type { ComponentProps } from "react";
import styles from "./Badge.module.scss";

export type BadgeVariant = "neutral" | "positive" | "negative";

export type BadgeProps = ComponentProps<"span"> & {
  /** Label of the badge. */
  children: string;
  /** Visual tone of the badge. */
  variant?: BadgeVariant;
  /** Extra classes for the badge. If multiple, separate them with spaces. */
  className?: string;
};

/** Short text label that adds extra information, such as a status.
 * Badge information should not be conveyed by color alone: use appropriate text.
 */
export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={className ? `${styles.badge} ${className}` : styles.badge}
      data-variant={variant}
    />
  );
}
