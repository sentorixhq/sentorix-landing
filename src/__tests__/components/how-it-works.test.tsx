import { render, screen } from "@testing-library/react";
import { HowItWorks } from "@/components/how-it-works";

describe("HowItWorks", () => {
  it("renders the main heading", () => {
    render(<HowItWorks />);
    expect(screen.getByText(/how sentorix works/i)).toBeInTheDocument();
  });

  it("renders the subheading description", () => {
    render(<HowItWorks />);
    expect(screen.getByText(/every ai request flows through the sentorix gateway/i)).toBeInTheDocument();
  });

  it("renders step 01", () => {
    render(<HowItWorks />);
    expect(screen.getByText("01")).toBeInTheDocument();
  });

  it("renders step 02", () => {
    render(<HowItWorks />);
    expect(screen.getByText("02")).toBeInTheDocument();
  });

  it("renders step 03", () => {
    render(<HowItWorks />);
    expect(screen.getByText("03")).toBeInTheDocument();
  });

  it("renders 'Intercept' step title", () => {
    render(<HowItWorks />);
    expect(screen.getByText("Intercept")).toBeInTheDocument();
  });

  it("renders 'Inspect & Enforce' step title", () => {
    render(<HowItWorks />);
    expect(screen.getByText(/inspect & enforce/i)).toBeInTheDocument();
  });

  it("renders 'Log & Report' step title", () => {
    render(<HowItWorks />);
    expect(screen.getByText(/log & report/i)).toBeInTheDocument();
  });

  it("renders Intercept step description", () => {
    render(<HowItWorks />);
    expect(screen.getByText(/routes ai requests through the sentorix gateway with a single base url change/i)).toBeInTheDocument();
  });

  it("renders Inspect step description", () => {
    render(<HowItWorks />);
    expect(screen.getByText(/every request is scanned for pii and checked against your policies/i)).toBeInTheDocument();
  });

  it("renders Log step description", () => {
    render(<HowItWorks />);
    expect(screen.getByText(/7-year retention/i)).toBeInTheDocument();
  });

  it("renders 'Your App' in the flow diagram", () => {
    render(<HowItWorks />);
    expect(screen.getByText("Your App")).toBeInTheDocument();
  });

  it("renders 'Sentorix Gateway' in the flow diagram", () => {
    render(<HowItWorks />);
    expect(screen.getByText("Sentorix Gateway")).toBeInTheDocument();
  });

  it("renders PII Scanner in the gateway", () => {
    render(<HowItWorks />);
    expect(screen.getByText("PII Scanner")).toBeInTheDocument();
  });

  it("renders Policy Engine in the gateway", () => {
    render(<HowItWorks />);
    expect(screen.getByText("Policy Engine")).toBeInTheDocument();
  });

  it("renders the '<20ms' latency badge", () => {
    render(<HowItWorks />);
    expect(screen.getByText("<20ms")).toBeInTheDocument();
  });

  it("renders the section with id='how-it-works'", () => {
    const { container } = render(<HowItWorks />);
    expect(container.querySelector("#how-it-works")).toBeInTheDocument();
  });
});
