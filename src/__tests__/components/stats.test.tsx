import { render, screen } from "@testing-library/react";
import { Stats } from "@/components/stats";

describe("Stats", () => {
  it("renders the '<20ms' gateway latency metric", () => {
    render(<Stats />);
    expect(screen.getByText("<20ms")).toBeInTheDocument();
  });

  it("renders the '12+' PII entity types metric", () => {
    render(<Stats />);
    expect(screen.getByText("12+")).toBeInTheDocument();
  });

  it("renders the '7 yrs' audit retention metric", () => {
    render(<Stats />);
    expect(screen.getByText("7 yrs")).toBeInTheDocument();
  });

  it("renders the '99.9%' uptime SLA metric", () => {
    render(<Stats />);
    expect(screen.getByText("99.9%")).toBeInTheDocument();
  });

  it("renders the gateway latency label", () => {
    render(<Stats />);
    expect(screen.getByText(/gateway latency/i)).toBeInTheDocument();
  });

  it("renders the PII entity types label", () => {
    render(<Stats />);
    expect(screen.getByText(/pii entity types detected/i)).toBeInTheDocument();
  });

  it("renders the audit retention label", () => {
    render(<Stats />);
    expect(screen.getByText(/immutable audit retention/i)).toBeInTheDocument();
  });

  it("renders the uptime SLA label", () => {
    render(<Stats />);
    expect(screen.getByText(/uptime sla/i)).toBeInTheDocument();
  });

  it("renders all 4 metric groups", () => {
    const { container } = render(<Stats />);
    const metricValues = container.querySelectorAll(".text-center");
    expect(metricValues.length).toBe(4);
  });
});
