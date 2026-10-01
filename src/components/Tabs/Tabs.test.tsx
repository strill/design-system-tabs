import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/axe";
import { Tabs } from "./Tabs";

function renderTabs() {
  return render(
    <Tabs aria-label="Sections">
      <Tabs.Tab label="Emails">Emails content</Tabs.Tab>
      <Tabs.Tab label="Files">Files content</Tabs.Tab>
      <Tabs.Tab label="Edits">Edits content</Tabs.Tab>
    </Tabs>,
  );
}

const getTab = (name: string) => screen.getByRole("tab", { name });

// The named tab is the only selected one, and its panel is the only visible one.
function expectSelected(name: string) {
  const selected = getTab(name);
  for (const tab of screen.getAllByRole("tab")) {
    expect(tab).toHaveAttribute("aria-selected", String(tab === selected));
  }
  expect(screen.getAllByRole("tabpanel")).toEqual([screen.getByRole("tabpanel", { name })]);
}

describe("Tabs", () => {
  describe("structure", () => {
    it("exposes a named tab list with one tab per Tabs.Tab", () => {
      renderTabs();

      expect(screen.getByRole("tablist", { name: "Sections" })).toBeInTheDocument();
      expect(screen.getAllByRole("tab")).toHaveLength(3);
    });

    it("keeps every panel in the document and links each one to its tab", () => {
      renderTabs();

      expect(screen.getAllByRole("tabpanel", { hidden: true })).toHaveLength(3);
      for (const tab of screen.getAllByRole("tab")) {
        const panel = document.getElementById(tab.getAttribute("aria-controls") ?? "");
        expect(panel).toHaveAttribute("aria-labelledby", tab.id);
      }
    });

    it("builds its ids from the id prop when given and keeps them unique across instances", () => {
      const { container } = render(
        <>
          <Tabs aria-label="First" id="account">
            <Tabs.Tab label="Emails">Emails content</Tabs.Tab>
          </Tabs>
          <Tabs aria-label="Second">
            <Tabs.Tab label="Files">Files content</Tabs.Tab>
          </Tabs>
        </>,
      );

      expect(container.firstChild).toHaveAttribute("id", "account");
      expect(getTab("Emails").id).toMatch(/^account-/);
      expect(screen.getByRole("tabpanel", { name: "Emails" }).id).toMatch(/^account-/);

      const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("ignores children that are not Tabs.Tab", () => {
      render(
        <Tabs aria-label="Sections">
          <Tabs.Tab label="First">First content</Tabs.Tab>
          <p>Stray paragraph</p>
        </Tabs>,
      );

      expect(screen.getAllByRole("tab")).toHaveLength(1);
      expect(screen.queryByText("Stray paragraph")).not.toBeInTheDocument();
    });

    it("forwards other attributes to the root element", () => {
      const { container } = render(
        <Tabs aria-label="Sections" className="custom" data-testid="tabs">
          <Tabs.Tab label="First">First content</Tabs.Tab>
        </Tabs>,
      );

      expect(container.firstChild).toBe(screen.getByTestId("tabs"));
      expect(screen.getByTestId("tabs")).toHaveClass("custom");
    });
  });

  describe("variant", () => {
    it("uses the underline variant by default", () => {
      renderTabs();

      for (const tab of screen.getAllByRole("tab")) {
        expect(tab).toHaveAttribute("data-variant", "underline");
      }
    });

    it("applies the variant of the group to every tab, whatever the tab asks for", () => {
      render(
        <Tabs aria-label="Sections" variant="pill">
          <Tabs.Tab label="Emails">Emails content</Tabs.Tab>
          <Tabs.Tab label="Files" variant="underline">
            Files content
          </Tabs.Tab>
        </Tabs>,
      );

      for (const tab of screen.getAllByRole("tab")) {
        expect(tab).toHaveAttribute("data-variant", "pill");
      }
    });
  });

  describe("selection", () => {
    it("starts on the first tab and switches to the clicked one", async () => {
      const user = userEvent.setup();
      renderTabs();

      expectSelected("Emails");

      await user.click(getTab("Edits"));

      expectSelected("Edits");
    });
  });

  describe("removed tabs", () => {
    it("falls back to the last tab when the selected one is removed", async () => {
      const user = userEvent.setup();
      const { rerender } = renderTabs();
      await user.click(getTab("Edits"));

      rerender(
        <Tabs aria-label="Sections">
          <Tabs.Tab label="Emails">Emails content</Tabs.Tab>
          <Tabs.Tab label="Files">Files content</Tabs.Tab>
        </Tabs>,
      );

      expectSelected("Files");
      expect(getTab("Files")).toHaveAttribute("tabindex", "0");
    });
  });

  describe("keyboard", () => {
    it("keeps only the selected tab in the tab order", async () => {
      const user = userEvent.setup();
      renderTabs();

      expect(screen.getAllByRole("tab").map((tab) => tab.tabIndex)).toEqual([0, -1, -1]);

      await user.click(getTab("Edits"));

      expect(screen.getAllByRole("tab").map((tab) => tab.tabIndex)).toEqual([-1, -1, 0]);
    });

    it("moves from the selected tab to its panel with Tab", async () => {
      const user = userEvent.setup();
      renderTabs();

      await user.tab();
      expect(getTab("Emails")).toHaveFocus();

      await user.tab();
      expect(screen.getByRole("tabpanel", { name: "Emails" })).toHaveFocus();
    });

    it.each([
      ["ArrowRight", "Emails", "Files"],
      ["ArrowRight", "Edits", "Emails"],
      ["ArrowLeft", "Files", "Emails"],
      ["ArrowLeft", "Emails", "Edits"],
      ["Home", "Edits", "Emails"],
      ["End", "Emails", "Edits"],
    ])("%s from %s focuses and selects %s", async (key, from, to) => {
      const user = userEvent.setup();
      renderTabs();
      await user.click(getTab(from));

      await user.keyboard(`{${key}}`);

      expect(getTab(to)).toHaveFocus();
      expectSelected(to);
    });

    it("ignores other keys and browser shortcuts", async () => {
      const user = userEvent.setup();
      renderTabs();
      await user.click(getTab("Files"));

      await user.keyboard("{ArrowDown}{Alt>}{ArrowRight}{/Alt}");

      expect(getTab("Files")).toHaveFocus();
      expectSelected("Files");
    });
  });

  describe("click handlers", () => {
    it("calls the onClick of a Tabs.Tab and still selects it", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Tabs aria-label="Sections">
          <Tabs.Tab label="Emails">Emails content</Tabs.Tab>
          <Tabs.Tab label="Files" onClick={onClick}>
            Files content
          </Tabs.Tab>
        </Tabs>,
      );

      await user.click(getTab("Files"));

      expect(onClick).toHaveBeenCalledTimes(1);
      expectSelected("Files");
    });
  });

  describe("accessibility", () => {
    it.each(["underline", "pill"] as const)(
      "has no detectable violations in the initial state (%s)",
      async (variant) => {
        const { container } = render(
          <Tabs aria-label="Sections" variant={variant}>
            <Tabs.Tab label="Emails">Emails content</Tabs.Tab>
            <Tabs.Tab label="Files">Files content</Tabs.Tab>
          </Tabs>,
        );

        await expectNoAxeViolations(container);
      },
    );
  });
});
