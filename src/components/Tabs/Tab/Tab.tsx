import type { ComponentProps, ReactNode } from "react";
import styles from "./Tab.module.scss";

export type TabVariant = "underline" | "pill";

export type TabProps = ComponentProps<"button"> & {
  /** Tab label. */
  label: string;
  /** Panel content, rendered by `Tabs`. */
  children?: ReactNode;
  /** Tab visual variant. Overridden by `Tabs`. */
  variant?: TabVariant;
};

/** Button that selects a panel. Use inside `Tabs`. */
export function Tab({
  label,
  variant = "underline",
  children: _panel,
  className,
  ...props
}: TabProps) {
  return (
    <button
      type="button"
      {...props}
      data-variant={variant}
      className={className ? `${styles.tab} ${className}` : styles.tab}
    >
      {label}
    </button>
  );
}
