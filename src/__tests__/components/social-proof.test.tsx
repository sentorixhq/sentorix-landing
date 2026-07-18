import { render, screen, within } from "@testing-library/react";
import { SocialProof } from "@/components/social-proof";

describe("SocialProof", () => {
  it("renders the section heading", () => {
    render(<SocialProof />);
    expect(screen.getByText(/built for regulated industries/i)).toBeInTheDocument();
  });

  it("renders EU AI Act regulation label", () => {
    render(<SocialProof />);
    expect(screen.getByText("EU AI Act")).toBeInTheDocument();
  });

  it("renders HIPAA regulation label", () => {
    render(<SocialProof />);
    expect(screen.getByText("HIPAA")).toBeInTheDocument();
  });

  it("renders India DPDP Act regulation label", () => {
    render(<SocialProof />);
    expect(screen.getByText("India DPDP Act")).toBeInTheDocument();
  });

  it("renders GDPR / SOC 2 regulation label", () => {
    render(<SocialProof />);
    expect(screen.getByText("GDPR / SOC 2")).toBeInTheDocument();
  });

  it("renders EU AI Act description", () => {
    render(<SocialProof />);
    expect(screen.getByText(/high-risk ai systems require documentation/i)).toBeInTheDocument();
  });

  it("renders HIPAA description", () => {
    render(<SocialProof />);
    expect(screen.getByText(/healthcare ai applications cannot send phi/i)).toBeInTheDocument();
  });

  it("renders DPDP description", () => {
    render(<SocialProof />);
    expect(screen.getByText(/personal data processing requires purpose limitation/i)).toBeInTheDocument();
  });

  it("renders the Cloudflare analogy blockquote", () => {
    render(<SocialProof />);
    expect(screen.getByRole("blockquote")).toBeInTheDocument();
    expect(screen.getByText(/if cloudflare protects your web traffic/i)).toBeInTheDocument();
  });

  it("renders the comparison table", () => {
    render(<SocialProof />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("renders Cloudflare and Sentorix table column headers", () => {
    render(<SocialProof />);
    const table = screen.getByRole("table");
    expect(within(table).getByText("Cloudflare")).toBeInTheDocument();
    expect(within(table).getByText("Sentorix")).toBeInTheDocument();
  });

  it("renders all 5 comparison row labels", () => {
    render(<SocialProof />);
    expect(screen.getByText("Protects")).toBeInTheDocument();
    expect(screen.getByText("Inspects")).toBeInTheDocument();
    expect(screen.getByText("Blocks")).toBeInTheDocument();
    expect(screen.getByText("Logs")).toBeInTheDocument();
    expect(screen.getByText("Sits between")).toBeInTheDocument();
  });

  it("renders Cloudflare column values", () => {
    render(<SocialProof />);
    expect(screen.getByText("Web traffic")).toBeInTheDocument();
    expect(screen.getByText("HTTP/HTTPS")).toBeInTheDocument();
    expect(screen.getByText("Bad actors")).toBeInTheDocument();
    expect(screen.getByText("Access logs")).toBeInTheDocument();
    expect(screen.getByText("You + web")).toBeInTheDocument();
  });

  it("renders Sentorix column values", () => {
    render(<SocialProof />);
    expect(screen.getByText("AI traffic")).toBeInTheDocument();
    expect(screen.getByText("LLM prompts")).toBeInTheDocument();
    expect(screen.getByText("PII + attacks")).toBeInTheDocument();
    expect(screen.getByText("Audit trail")).toBeInTheDocument();
    expect(screen.getByText("You + AI")).toBeInTheDocument();
  });
});
