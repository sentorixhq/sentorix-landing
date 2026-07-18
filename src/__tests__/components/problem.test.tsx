import { render, screen } from "@testing-library/react";
import { Problem } from "@/components/problem";

describe("Problem", () => {
  it("renders the section heading", () => {
    render(<Problem />);
    expect(screen.getByText(/your team is already using ai/i)).toBeInTheDocument();
  });

  it("renders the subheading copy", () => {
    render(<Problem />);
    expect(screen.getByText(/most companies adopt ai tools faster than they can govern them/i)).toBeInTheDocument();
  });

  it("renders 'Sensitive data in AI prompts' card", () => {
    render(<Problem />);
    expect(screen.getByText(/sensitive data in ai prompts/i)).toBeInTheDocument();
  });

  it("renders 'Zero visibility into AI usage' card", () => {
    render(<Problem />);
    expect(screen.getByText(/zero visibility into ai usage/i)).toBeInTheDocument();
  });

  it("renders 'AI systems under attack' card", () => {
    render(<Problem />);
    expect(screen.getByText(/ai systems under attack/i)).toBeInTheDocument();
  });

  it("renders 'Unauthorised AI tool usage' card", () => {
    render(<Problem />);
    expect(screen.getByText(/unauthorised ai tool usage/i)).toBeInTheDocument();
  });

  it("renders body text for the PII problem card", () => {
    render(<Problem />);
    expect(screen.getByText(/employees paste customer pii/i)).toBeInTheDocument();
  });

  it("renders body text for the visibility problem card", () => {
    render(<Problem />);
    expect(screen.getByText(/when regulators ask what data was sent/i)).toBeInTheDocument();
  });

  it("renders body text for the attack problem card", () => {
    render(<Problem />);
    expect(screen.getByText(/malicious users craft prompts/i)).toBeInTheDocument();
  });

  it("renders body text for the unauthorised usage card", () => {
    render(<Problem />);
    expect(screen.getByText(/your policies say no external ai/i)).toBeInTheDocument();
  });

  it("renders 4 problem cards", () => {
    const { container } = render(<Problem />);
    // Each card has a rounded-2xl class
    const cards = container.querySelectorAll(".rounded-2xl");
    expect(cards.length).toBe(4);
  });

  it("renders the section with id='problem'", () => {
    const { container } = render(<Problem />);
    expect(container.querySelector("#problem")).toBeInTheDocument();
  });
});
