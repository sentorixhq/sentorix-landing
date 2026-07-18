import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders as <button> by default", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<Button>Submit</Button>);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("renders as <a> when href is provided", () => {
    render(<Button href="/docs">Docs</Button>);
    const link = screen.getByRole("link", { name: /docs/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/docs");
  });

  it("passes target and rel to anchor", () => {
    render(
      <Button href="https://example.com" target="_blank" rel="noopener noreferrer">
        External
      </Button>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("fires onClick when clicked", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Press</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is set", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("applies primary variant classes by default", () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/bg-brand-500/);
  });

  it("applies secondary variant classes", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/bg-white/);
    expect(btn.className).toMatch(/text-brand-600/);
  });

  it("applies ghost variant classes", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/border/);
    expect(btn.className).toMatch(/text-white/);
  });

  it("applies sm size classes", () => {
    render(<Button size="sm">Small</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/px-4/);
    expect(btn.className).toMatch(/py-2/);
    expect(btn.className).toMatch(/text-sm/);
  });

  it("applies lg size classes", () => {
    render(<Button size="lg">Large</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/px-8/);
    expect(btn.className).toMatch(/text-base/);
  });

  it("merges custom className", () => {
    render(<Button className="mt-4">Custom</Button>);
    expect(screen.getByRole("button").className).toMatch(/mt-4/);
  });

  it("forwards arbitrary button props (type)", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });
});
