import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

// Stats is a pure server component — let it render naturally; mocking it
// fails due to a next/jest SWC hoisting quirk specific to that module name.
jest.mock("@/components/navbar", () => ({
  Navbar: () => <nav data-testid="navbar" />,
}));
jest.mock("@/components/hero", () => ({
  Hero: () => <section data-testid="hero" />,
}));
jest.mock("@/components/problem", () => ({
  Problem: () => <section data-testid="problem" />,
}));
jest.mock("@/components/how-it-works", () => ({
  HowItWorks: () => <section data-testid="how-it-works" />,
}));
jest.mock("@/components/value-props", () => ({
  ValueProps: () => <section data-testid="value-props" />,
}));
jest.mock("@/components/social-proof", () => ({
  SocialProof: () => <section data-testid="social-proof" />,
}));
jest.mock("@/components/for-developers", () => ({
  ForDevelopers: () => <section data-testid="for-developers" />,
}));
jest.mock("@/components/demo-form", () => ({
  DemoForm: () => <section data-testid="demo-form" />,
}));
jest.mock("@/components/footer", () => ({
  Footer: () => <footer data-testid="footer" />,
}));

describe("Home page", () => {
  it("renders without crashing", () => {
    expect(() => render(<Home />)).not.toThrow();
  });

  it("renders Navbar", () => {
    render(<Home />);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("renders Hero", () => {
    render(<Home />);
    expect(screen.getByTestId("hero")).toBeInTheDocument();
  });

  it("renders Problem section", () => {
    render(<Home />);
    expect(screen.getByTestId("problem")).toBeInTheDocument();
  });

  it("renders HowItWorks section", () => {
    render(<Home />);
    expect(screen.getByTestId("how-it-works")).toBeInTheDocument();
  });

  it("renders ValueProps section", () => {
    render(<Home />);
    expect(screen.getByTestId("value-props")).toBeInTheDocument();
  });

  it("renders SocialProof section", () => {
    render(<Home />);
    expect(screen.getByTestId("social-proof")).toBeInTheDocument();
  });

  it("renders ForDevelopers section", () => {
    render(<Home />);
    expect(screen.getByTestId("for-developers")).toBeInTheDocument();
  });

  it("renders DemoForm section", () => {
    render(<Home />);
    expect(screen.getByTestId("demo-form")).toBeInTheDocument();
  });

  it("renders Footer", () => {
    render(<Home />);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders all major mocked sections inside <main>", () => {
    const { container } = render(<Home />);
    const main = container.querySelector("main")!;
    const testIds = Array.from(main.querySelectorAll("[data-testid]")).map(
      (el) => el.getAttribute("data-testid")
    );
    expect(testIds).toContain("hero");
    expect(testIds).toContain("problem");
    expect(testIds).toContain("how-it-works");
    expect(testIds).toContain("value-props");
    expect(testIds).toContain("social-proof");
    expect(testIds).toContain("for-developers");
    expect(testIds).toContain("demo-form");
    // Verify hero comes before problem
    expect(testIds.indexOf("hero")).toBeLessThan(testIds.indexOf("problem"));
    // Verify how-it-works comes before for-developers
    expect(testIds.indexOf("how-it-works")).toBeLessThan(testIds.indexOf("for-developers"));
  });
});
