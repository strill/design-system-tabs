import {
  Children,
  type ComponentProps,
  isValidElement,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
  useId,
  useState,
} from "react";
import { Tab, type TabProps, type TabVariant } from "./Tab";
import styles from "./Tabs.module.scss";

export type TabsProps = ComponentProps<"div"> & {
  /** Accessible name of the tab list, e.g. "User sections". */
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

  const [selectedIndex, setSelectedIndex] = useState(0);
  // Falls back to the last tab if the selected one is removed.
  const activeIndex = Math.min(selectedIndex, tabs.length - 1);

  function selectTab(index: number) {
    setSelectedIndex(index);
    const tab = document.getElementById(tabId(index));
    // focus() alone leaves a partly hidden tab cut off.
    tab?.focus({ preventScroll: true });
    tab?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    // Leave browser shortcuts such as Alt+Left alone.
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    const last = tabs.length - 1;
    const isRtl = getComputedStyle(event.currentTarget).direction === "rtl";
    const previousKey = isRtl ? "ArrowRight" : "ArrowLeft";
    const nextKey = isRtl ? "ArrowLeft" : "ArrowRight";

    switch (event.key) {
      case previousKey:
        selectTab(activeIndex === 0 ? last : activeIndex - 1);
        break;
      case nextKey:
        selectTab(activeIndex === last ? 0 : activeIndex + 1);
        break;
      case "Home":
        selectTab(0);
        break;
      case "End":
        selectTab(last);
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  return (
    <div {...rootProps} id={id}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        data-variant={variant}
        className={styles.list}
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab, index) => (
          <Tab
            {...tab.props}
            key={tab.key}
            variant={variant}
            role="tab"
            id={tabId(index)}
            aria-selected={index === activeIndex}
            aria-controls={panelId(index)}
            tabIndex={index === activeIndex ? 0 : -1}
            onClick={(event) => {
              tab.props.onClick?.(event);
              selectTab(index);
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
