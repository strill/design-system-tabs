# Tabs & Badge

React components for a design system: an accessible `Tabs` (underline and pill variants, optional badge per tab) and a `Badge`.

```tsx
<Tabs aria-label="Mailbox sections" variant="pill">
  <Tabs.Tab label="Emails">Emails content</Tabs.Tab>
  <Tabs.Tab label="Files" badge={{ label: "Warning", variant: "negative" }}>
    Files content
  </Tabs.Tab>
</Tabs>
```

## Run

Needs Node 24 and pnpm.

```bash
pnpm install
pnpm dev          # demo page
pnpm storybook    # components and docs, on :6006
pnpm test
pnpm tsc
pnpm check        # Biome lint and format
```

## Design decisions

- **Pattern:** WAI-ARIA tabs with automatic activation. Arrow keys, `Home` and `End` move focus and select; only the selected tab is in the tab order.
- **Panels:** all panels stay in the document and are hidden with `hidden`, so `aria-controls` always points to an existing element.
- **Badge text:** it is part of the tab's accessible name ("Files Warning"). Put the meaning in the text; color only reinforces it.
- **Selection:** managed by `Tabs`; the first tab is selected at start.
- **Mobile:** the tab list scrolls horizontally and the focused tab is scrolled into view.
- **Motion:** short transitions, disabled with `prefers-reduced-motion`.
- **Right-to-left:** ready.

## Testing and accessibility

- Vitest and Testing Library, querying by role and accessible name, plus axe on every variant.
- Color contrast is not covered by the tests (jsdom has no layout): check it in Storybook's Accessibility panel.

## Limits and extensions

- Tabs are identified by position, so adding or removing tabs can move the selection. An `id` per tab would let them change freely.
- The selection can't be controlled. An initial tab and a change callback would add that.
- `label` and the badge text are strings, and `Tabs.Tab` must be a direct child of `Tabs`.
- Every panel has `tabindex="0"`, as in the WAI-ARIA example: a panel that already holds focusable content adds one extra Tab stop.
- `Tabs` needs at least 4px of space on its sides (the focus ring overflows the list); flush with the screen edge the page can scroll horizontally.
- Forced colors (high contrast) mode hasn't been checked.
