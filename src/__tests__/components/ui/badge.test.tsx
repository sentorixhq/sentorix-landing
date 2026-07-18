import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";

describe("Badge", () => {
  it("renders children text", () => {
    render(<Badge>AI Governance</Badge>);
    expect(screen.getByText("AI Governance")).toBeInTheDocument();
  });

  it("renders as a <span> element", () => {
    const { container } = render(<Badge>Test</Badge>);
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("applies default styling classes", () => {
    const { container } = render(<Badge>Test</Badge>);
    const el = container.querySelector("span")!;
    expect(el.className).toMatch(/inline-flex/);
    expect(el.className).toMatch(/rounded-full/);
  });

  it("merges a custom className with defaults", () => {
    const { container } = render(<Badge className="text-red-500">Test</Badge>);
    const el = container.querySelector("span")!;
    expect(el.className).toMatch(/text-red-500/);
    expect(el.className).toMatch(/inline-flex/);
  });

  it("renders ReactNode children, not just strings", () => {
    render(
      <Badge>
        <span data-testid="child">inner</span>
      </Badge>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});
