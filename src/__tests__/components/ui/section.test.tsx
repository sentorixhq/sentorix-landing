import { render, screen } from "@testing-library/react";
import { Section, SectionHeading, SectionSubheading } from "@/components/ui/section";

describe("Section", () => {
  it("renders children", () => {
    render(<Section><p>Content</p></Section>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies the supplied id", () => {
    const { container } = render(<Section id="features"><p>X</p></Section>);
    expect(container.querySelector("#features")).toBeInTheDocument();
  });

  it("renders as a <section> element", () => {
    const { container } = render(<Section><p>X</p></Section>);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("merges custom className onto default classes", () => {
    const { container } = render(
      <Section className="bg-dark-900"><p>X</p></Section>
    );
    const el = container.querySelector("section")!;
    expect(el.className).toMatch(/bg-dark-900/);
    expect(el.className).toMatch(/py-20/);
  });
});

describe("SectionHeading", () => {
  it("renders children text", () => {
    render(<SectionHeading>Our Features</SectionHeading>);
    expect(screen.getByText("Our Features")).toBeInTheDocument();
  });

  it("renders as an <h2>", () => {
    render(<SectionHeading>Title</SectionHeading>);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("merges custom className", () => {
    render(<SectionHeading className="text-white">Title</SectionHeading>);
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2.className).toMatch(/text-white/);
    expect(h2.className).toMatch(/font-bold/);
  });
});

describe("SectionSubheading", () => {
  it("renders children text", () => {
    render(<SectionSubheading>Subtitle here</SectionSubheading>);
    expect(screen.getByText("Subtitle here")).toBeInTheDocument();
  });

  it("renders as a <p>", () => {
    const { container } = render(<SectionSubheading>Sub</SectionSubheading>);
    expect(container.querySelector("p")).toBeInTheDocument();
  });

  it("merges custom className", () => {
    const { container } = render(
      <SectionSubheading className="text-gray-400">Sub</SectionSubheading>
    );
    expect(container.querySelector("p")!.className).toMatch(/text-gray-400/);
  });
});
