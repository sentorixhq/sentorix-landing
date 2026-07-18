import { render, screen } from "@testing-library/react";
import { ValueProps } from "@/components/value-props";

describe("ValueProps", () => {
  it("renders the section heading", () => {
    render(<ValueProps />);
    expect(screen.getByText(/everything your compliance team/i)).toBeInTheDocument();
  });

  it("renders 'Live in 5 minutes' heading", () => {
    render(<ValueProps />);
    expect(screen.getByText(/live in 5 minutes/i)).toBeInTheDocument();
  });

  it("renders 'Real-time PII detection' card heading", () => {
    render(<ValueProps />);
    expect(screen.getByText(/real-time pii detection/i)).toBeInTheDocument();
  });

  it("renders 'Audit-ready from day one' card heading", () => {
    render(<ValueProps />);
    expect(screen.getByText(/audit-ready from day one/i)).toBeInTheDocument();
  });

  it("renders the live-in-5-minutes description", () => {
    render(<ValueProps />);
    expect(screen.getByText(/change your base url/i)).toBeInTheDocument();
  });

  it("renders 'OpenAI compatible' feature in the large card", () => {
    render(<ValueProps />);
    expect(screen.getByText("OpenAI compatible")).toBeInTheDocument();
  });

  it("renders 'Anthropic compatible' feature", () => {
    render(<ValueProps />);
    expect(screen.getByText("Anthropic compatible")).toBeInTheDocument();
  });

  it("renders 'AWS Bedrock compatible' feature", () => {
    render(<ValueProps />);
    expect(screen.getByText("AWS Bedrock compatible")).toBeInTheDocument();
  });

  it("renders 'Works with any language or framework' feature", () => {
    render(<ValueProps />);
    expect(screen.getByText(/works with any language or framework/i)).toBeInTheDocument();
  });

  it("renders PII detection description", () => {
    render(<ValueProps />);
    expect(screen.getByText(/powered by microsoft presidio/i)).toBeInTheDocument();
  });

  it("renders 'Names, emails, phone numbers' PII feature", () => {
    render(<ValueProps />);
    expect(screen.getByText(/names, emails, phone numbers/i)).toBeInTheDocument();
  });

  it("renders audit retention information", () => {
    render(<ValueProps />);
    expect(screen.getByText(/7-year retention/i)).toBeInTheDocument();
  });

  it("renders 'EU AI Act ready' compliance feature", () => {
    render(<ValueProps />);
    expect(screen.getByText(/eu ai act ready/i)).toBeInTheDocument();
  });

  it("renders 'HIPAA compatible' compliance feature", () => {
    render(<ValueProps />);
    expect(screen.getByText(/hipaa compatible/i)).toBeInTheDocument();
  });

  it("renders 'SOC 2 evidence' compliance feature", () => {
    render(<ValueProps />);
    expect(screen.getByText(/soc 2 evidence/i)).toBeInTheDocument();
  });
});
