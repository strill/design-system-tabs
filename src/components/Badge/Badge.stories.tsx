import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  args: {
    children: "Badge",
    variant: "neutral",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      table: {
        type: { summary: '"neutral" | "positive" | "negative"' },
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Positive: Story = {
  args: { variant: "positive" },
};

export const Negative: Story = {
  args: { variant: "negative" },
};
