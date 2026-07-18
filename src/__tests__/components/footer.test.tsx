import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Footer } from "@/components/footer";

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

describe("Footer — branding", () => {
  it("renders 'Sentorix' brand name", () => {
    render(<Footer />);
    expect(screen.getByText("Sentorix")).toBeInTheDocument();
  });

  it("renders 'AI Governance Gateway' tagline", () => {
    render(<Footer />);
    expect(screen.getByText("AI Governance Gateway")).toBeInTheDocument();
  });

  it("renders copyright notice", () => {
    render(<Footer />);
    expect(screen.getByText(/© 2026 Sentorix/i)).toBeInTheDocument();
  });

  it("renders the 'Built with care in Bengaluru' line", () => {
    render(<Footer />);
    expect(screen.getByText(/built with care in bengaluru/i)).toBeInTheDocument();
  });
});

describe("Footer — column headings", () => {
  it("renders 'Product' column heading", () => {
    render(<Footer />);
    expect(screen.getByRole("heading", { name: /^product$/i })).toBeInTheDocument();
  });

  it("renders 'Resources' column heading", () => {
    render(<Footer />);
    expect(screen.getByRole("heading", { name: /^resources$/i })).toBeInTheDocument();
  });

  it("renders 'Legal' column heading", () => {
    render(<Footer />);
    expect(screen.getByRole("heading", { name: /^legal$/i })).toBeInTheDocument();
  });
});

describe("Footer — Product links", () => {
  it("renders 'How it works' button", () => {
    render(<Footer />);
    expect(screen.getByRole("button", { name: /how it works/i })).toBeInTheDocument();
  });

  it("renders 'For developers' button", () => {
    render(<Footer />);
    expect(screen.getByRole("button", { name: /for developers/i })).toBeInTheDocument();
  });

  it("renders 'Request a demo' button", () => {
    render(<Footer />);
    expect(screen.getByRole("button", { name: /request a demo/i })).toBeInTheDocument();
  });

  it("renders 'Sign in' link pointing to app subdomain", () => {
    render(<Footer />);
    const signIn = screen.getByRole("link", { name: /sign in/i });
    expect(signIn).toHaveAttribute("href", "https://app.sentorix.io");
  });
});

describe("Footer — Resources links", () => {
  it("renders Documentation link", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /documentation/i })).toBeInTheDocument();
  });

  it("renders API Reference link", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /api reference/i })).toBeInTheDocument();
  });

  it("renders at least one GitHub link in Resources", () => {
    render(<Footer />);
    const githubLinks = screen.getAllByRole("link", { name: /github/i });
    expect(githubLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("external resource links open in new tab", () => {
    render(<Footer />);
    const docLink = screen.getByRole("link", { name: /documentation/i });
    expect(docLink).toHaveAttribute("target", "_blank");
    expect(docLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("Footer — Legal links", () => {
  it("renders Privacy Policy link", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /privacy policy/i })).toBeInTheDocument();
  });

  it("renders Terms of Service link", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /terms of service/i })).toBeInTheDocument();
  });

  it("renders Security link", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /^security$/i })).toBeInTheDocument();
  });

  it("Privacy Policy link has correct href", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /privacy policy/i })).toHaveAttribute("href", "/privacy");
  });
});

describe("Footer — Social links", () => {
  it("renders GitHub social icon link via aria-label", () => {
    render(<Footer />);
    // The social icon <a aria-label="GitHub"> is distinct from the text "GitHub" link
    const allGithub = screen.getAllByRole("link", { name: /github/i });
    // One with text content, one with aria-label (svg icon)
    expect(allGithub.length).toBeGreaterThanOrEqual(2);
  });

  it("renders LinkedIn social icon link", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /linkedin/i })).toBeInTheDocument();
  });

  it("social icon links open in new tab", () => {
    render(<Footer />);
    const linkedIn = screen.getByRole("link", { name: /linkedin/i });
    expect(linkedIn).toHaveAttribute("target", "_blank");
    expect(linkedIn).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("calls window.scrollTo when Product nav button is clicked with target in DOM", async () => {
    const user = userEvent.setup();
    const section = document.createElement("section");
    section.id = "how-it-works";
    document.body.appendChild(section);

    render(<Footer />);
    await user.click(screen.getByRole("button", { name: /how it works/i }));
    expect(window.scrollTo).toHaveBeenCalled();

    document.body.removeChild(section);
  });
});
