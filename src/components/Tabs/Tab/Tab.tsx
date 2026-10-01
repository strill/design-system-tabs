import type { ComponentProps, ReactNode } from "react";
import { Badge, type BadgeVariant } from "../../Badge";
import styles from "./Tab.module.scss";

export type TabVariant = "underline" | "pill";

export type TabProps = ComponentProps<"button"> & {
  /** Tab label. */
  label: string;
  /** Badge after the tab label. */
  badge?: { label: string; variant?: BadgeVariant };
  /** Panel content, rendered by `Tabs`. */
  children?: ReactNode;
  /** Tab visual variant. Set by `Tabs`. */
  variant?: TabVariant;
  /** Extra CSS classes, separated by spaces. */
  className?: string;
};

/** Button that selects a panel. Use inside `Tabs`. */
export function Tab({
  label,
  badge,
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
      {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
    </button>
  );
}
