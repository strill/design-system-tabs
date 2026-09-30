import axe from "axe-core";
import { expect } from "vitest";

// Fails on axe violations. Color contrast is skipped: jsdom has no layout.
// It is checked in Storybook, with the a11y addon's Accessibility panel.
export async function expectNoAxeViolations(container: Element) {
  const { violations } = await axe.run(container, {
    rules: { "color-contrast": { enabled: false } },
  });
  expect(violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
}
