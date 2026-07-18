import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Hero } from "@/components/hero";

beforeAll(() => {
  window.scrollTo = jest.fn() as unknown as typeof window.scrollTo;
  Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
  Element.prototype.getBoundingClientRect = jest.fn(() => ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => {},
  }));
});

describe("Hero — main copy", () => {
  it("renders the early access badge", () => {
    render(<Hero />);
    expect(screen.getByText(/ai governance gateway · early access/i)).toBeInTheDocument();
  });

  it("renders 'AI calls.' in the h1", () => {
    render(<Hero />);
    // Text is split across nodes — match the full h1 content
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/ai calls\./i);
  });

  it("renders 'Inspected.' in the h1", () => {
    render(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/inspected\./i);
  });

  it("renders 'Governed.' in the h1", () => {
    render(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(/governed\./i);
  });

  it("renders the hero description paragraph", () => {
    render(<Hero />);
    expect(screen.getByText(/sentorix sits between your apps and ai providers/i)).toBeInTheDocument();
  });
});

describe("Hero — CTAs", () => {
  it("renders 'Request a demo' CTA button", () => {
    render(<Hero />);
    expect(screen.getByRole("button", { name: /request a demo/i })).toBeInTheDocument();
  });

  it("renders 'View docs' link", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /view docs/i })).toBeInTheDocument();
  });

  it("View docs link points to GitHub docs repo", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /view docs/i })).toHaveAttribute(
      "href",
      expect.stringContaining("github.com/sentorixhq/sentorix-docs")
    );
  });

  it("View docs link opens in a new tab", () => {
    render(<Hero />);
    const link = screen.getByRole("link", { name: /view docs/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("clicking 'Request a demo' calls window.scrollTo when #demo exists", async () => {
    const user = userEvent.setup();
    const demoSection = document.createElement("section");
    demoSection.id = "demo";
    document.body.appendChild(demoSection);

    render(<Hero />);
    await user.click(screen.getByRole("button", { name: /request a demo/i }));
    expect(window.scrollTo).toHaveBeenCalled();

    document.body.removeChild(demoSection);
  });

  it("does not throw when 'Request a demo' is clicked and #demo is absent", async () => {
    const user = userEvent.setup();
    render(<Hero />);
    await expect(
      user.click(screen.getByRole("button", { name: /request a demo/i }))
    ).resolves.not.toThrow();
  });
});

describe("Hero — trust badges", () => {
  it("renders EU AI Act trust badge", () => {
    render(<Hero />);
    expect(screen.getByText("EU AI Act")).toBeInTheDocument();
  });

  it("renders HIPAA trust badge", () => {
    render(<Hero />);
    expect(screen.getByText("HIPAA")).toBeInTheDocument();
  });

  it("renders SOC 2 trust badge", () => {
    render(<Hero />);
    expect(screen.getByText("SOC 2")).toBeInTheDocument();
  });

  it("renders India DPDP trust badge", () => {
    render(<Hero />);
    expect(screen.getByText("India DPDP")).toBeInTheDocument();
  });
});

describe("Hero — metrics strip", () => {
  it("renders <20ms latency metric", () => {
    render(<Hero />);
    expect(screen.getAllByText("<20ms")[0]).toBeInTheDocument();
  });

  it("renders 12+ PII types metric", () => {
    render(<Hero />);
    expect(screen.getAllByText("12+")[0]).toBeInTheDocument();
  });

  it("renders 7 yrs audit retention metric", () => {
    render(<Hero />);
    expect(screen.getAllByText("7 yrs")[0]).toBeInTheDocument();
  });
});

describe("Hero — TerminalDemo", () => {
  it("renders the gateway proxy title bar label", () => {
    render(<Hero />);
    // Title bar says 'sentorix — gateway proxy'
    expect(screen.getAllByText(/sentorix.*gateway/i)[0]).toBeInTheDocument();
  });

  it("renders PII Detected indicator", () => {
    render(<Hero />);
    expect(screen.getAllByText(/pii detected/i)[0]).toBeInTheDocument();
  });

  it("renders '200 OK' success response", () => {
    render(<Hero />);
    expect(screen.getAllByText(/200 ok/i)[0]).toBeInTheDocument();
  });

  it("renders the 17ms overhead badge", () => {
    render(<Hero />);
    expect(screen.getAllByText(/17ms overhead/i)[0]).toBeInTheDocument();
  });

  it("renders the '3 fields redacted' badge", () => {
    render(<Hero />);
    expect(screen.getAllByText(/3 fields redacted/i)[0]).toBeInTheDocument();
  });
});
