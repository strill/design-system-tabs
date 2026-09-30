import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe";
import { Badge, type BadgeVariant } from "./Badge";

describe("Badge", () => {
  it("renders its content", () => {
    render(<Badge>Badge</Badge>);
    expect(screen.getByText("Badge")).toBeInTheDocument();
  });

  it("uses the neutral variant by default", () => {
    render(<Badge>Badge</Badge>);

    expect(screen.getByText("Badge")).toHaveAttribute("data-variant", "neutral");
  });

  it.each<BadgeVariant>(["neutral", "positive", "negative"])(
    "applies the %s variant",
    (variant) => {
      render(<Badge variant={variant}>Badge</Badge>);

      expect(screen.getByText("Badge")).toHaveAttribute("data-variant", variant);
    },
  );

  it("applies a custom className", () => {
    render(<Badge className="custom">Badge</Badge>);

    expect(screen.getByText("Badge")).toHaveClass("custom");
  });

  it("forwards native attributes", () => {
    render(<Badge id="status">Warning</Badge>);

    expect(screen.getByText("Warning")).toHaveAttribute("id", "status");
  });

  // Markup only; contrast is checked in Storybook.
  it("has no detectable accessibility violations", async () => {
    const { container } = render(
      <>
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="positive">Positive</Badge>
        <Badge variant="negative">Negative</Badge>
      </>,
    );

    await expectNoAxeViolations(container);
  });
});
