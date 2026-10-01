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
  
## Getting started
  
Requires Node 24 and pnpm.

```bash
# Install dependencies
pnpm install
  
# Demo page
pnpm dev

# Run Storybook
pnpm storybook

# Tests
pnpm test

# Type check
pnpm tsc

# Lint and format (Biome)
pnpm check
```

## Notes

- Follows the WAI-ARIA tabs pattern with automatic activation. Keyboard and RTL are described in Storybook.
- Tests: Vitest, Testing Library and axe. Colour contrast is checked in Storybook's Accessibility panel, since jsdom has no layout.

## Limits and extensions

- Tabs are identified by position, so adding or removing tabs can move the selection. An `id` per tab would let them change freely.
- The selection can't be controlled. An initial tab and a change callback would add that.
- `label` and the badge text are strings, and `Tabs.Tab` must be a direct child of `Tabs`.
- Forced colors (high contrast) mode hasn't been checked.

✨