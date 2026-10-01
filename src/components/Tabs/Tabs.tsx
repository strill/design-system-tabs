import {
  Children,
  type ComponentProps,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useId,
  useState,
} from "react";
import { Tab, type TabProps, type TabVariant } from "./Tab";
import styles from "./Tabs.module.scss";

export type TabsProps = ComponentProps<"div"> & {
  /** Accessible name of the tab list. */
  "aria-label": string;
  /** Tabs visual variant. */
  variant?: TabVariant;
  /** `Tabs.Tab` elements. Other children are ignored. */
  children: ReactNode;
};

function isTab(child: ReactNode): child is ReactElement<TabProps> {
  return isValidElement(child) && child.type === Tab;
}

/** Groups related content into panels, showing one at a time. */
export function Tabs({
  "aria-label": ariaLabel,
  variant = "underline",
  children,
  id,
  ...rootProps
}: TabsProps) {
  const tabs = Children.toArray(children).filter(isTab);

  const generatedId = useId();
  const baseId = id ?? generatedId;
  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const panelId = (index: number) => `${baseId}-panel-${index}`;

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div {...rootProps} id={id}>
      <div role="tablist" aria-label={ariaLabel} data-variant={variant} className={styles.list}>
        {tabs.map((tab, index) => (
          <Tab
            {...tab.props}
            key={tab.key}
            variant={variant}
            role="tab"
            id={tabId(index)}
            aria-selected={index === activeIndex}
            aria-controls={panelId(index)}
            onClick={(event) => {
              tab.props.onClick?.(event);
              setActiveIndex(index);
            }}
          />
        ))}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.key}
          role="tabpanel"
          id={panelId(index)}
          aria-labelledby={tabId(index)}
          // biome-ignore lint/a11y/noNoninteractiveTabindex: the tab panel must be reachable with Tab
          tabIndex={0}
          hidden={index !== activeIndex}
          className={styles.panel}
        >
          {tab.props.children}
        </div>
      ))}
    </div>
  );
}

Tabs.Tab = Tab;
