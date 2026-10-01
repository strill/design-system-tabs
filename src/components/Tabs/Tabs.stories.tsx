import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./Tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  args: {
    "aria-label": "Sections",
    children: null,
  },
  argTypes: {
    children: { control: false },
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.Tab label="Emails">Emails content</Tabs.Tab>
      <Tabs.Tab label="Files">Files content</Tabs.Tab>
      <Tabs.Tab label="Edits">Edits content</Tabs.Tab>
      <Tabs.Tab label="Dashboard">Dashboard content</Tabs.Tab>
      <Tabs.Tab label="Messages">Messages content</Tabs.Tab>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Underline: Story = {
  args: { variant: "underline" },
};

export const Pill: Story = {
  args: { variant: "pill" },
};
