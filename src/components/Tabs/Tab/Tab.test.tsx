import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Tab } from "./Tab";

describe("Tab", () => {
  it("renders its label in a button", () => {
    render(<Tab label="Files" />);

    expect(screen.getByRole("button", { name: "Files" })).toHaveAttribute("type", "button");
  });

  it("uses the underline variant unless told otherwise", () => {
    const { rerender } = render(<Tab label="Files" />);
    expect(screen.getByRole("button", { name: "Files" })).toHaveAttribute(
      "data-variant",
      "underline",
    );

    rerender(<Tab label="Files" variant="pill" />);
    expect(screen.getByRole("button", { name: "Files" })).toHaveAttribute("data-variant", "pill");
  });

  it("does not render the content of its panel", () => {
    render(<Tab label="Files">Files content</Tab>);

    expect(screen.queryByText("Files content")).not.toBeInTheDocument();
  });

  it("passes className and native attributes to the button", () => {
    render(<Tab label="Files" className="custom" id="files-tab" />);

    const button = screen.getByRole("button", { name: "Files" });
    expect(button).toHaveClass("custom");
    expect(button).toHaveAttribute("id", "files-tab");
  });
});
