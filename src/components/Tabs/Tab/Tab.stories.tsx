import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tab } from "./Tab";

const meta = {
  title: "Components/Tabs/Tab",
  component: Tab,
  args: {
    "aria-selected": false,
    label: "Label",
  },
  argTypes: {
    "aria-selected": { control: "boolean", description: "Tab selected state. Set by `Tabs`." },
    badge: { control: "object" },
    children: { control: false },
    variant: {
      control: "inline-radio",
      table: {
        type: { summary: '"underline" | "pill"' },
      },
    },
  },
  render: (args) => (
    <div role="tablist" aria-label="Single tab">
      <Tab role="tab" {...args} />
    </div>
  ),
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Underline: Story = {
  args: { variant: "underline" },
};

export const UnderlineSelected: Story = {
  args: { variant: "underline", "aria-selected": true },
};

export const UnderlineWithBadge: Story = {
  args: { variant: "underline", badge: { label: "Warning", variant: "negative" } },
};

export const Pill: Story = {
  args: { variant: "pill" },
};

export const PillSelected: Story = {
  args: { variant: "pill", "aria-selected": true },
};

export const PillWithBadge: Story = {
  args: { variant: "pill", badge: { label: "Warning", variant: "negative" } },
};
