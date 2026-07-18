import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "@/components/navbar";

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

describe("Navbar — content", () => {
  it("renders the Sentorix brand name", () => {
    render(<Navbar />);
    expect(screen.getByText("Sentorix")).toBeInTheDocument();
  });

  it("logo links to /", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: /sentorix/i })).toHaveAttribute("href", "/");
  });

  it("renders 'How it works' nav link", () => {
    render(<Navbar />);
    expect(screen.getAllByRole("button", { name: /how it works/i })[0]).toBeInTheDocument();
  });

  it("renders 'For developers' nav link", () => {
    render(<Navbar />);
    expect(screen.getAllByRole("button", { name: /for developers/i })[0]).toBeInTheDocument();
  });

  it("renders Sign in link", () => {
    render(<Navbar />);
    const signInLinks = screen.getAllByRole("link", { name: /sign in/i });
    expect(signInLinks.length).toBeGreaterThan(0);
    expect(signInLinks[0]).toHaveAttribute("href", "https://app.sentorix.io");
  });

  it("renders Request a demo button", () => {
    render(<Navbar />);
    // Matches both desktop and mobile versions
    const demoBtns = screen.getAllByRole("button", { name: /request a demo/i });
    expect(demoBtns.length).toBeGreaterThan(0);
  });

  it("renders hamburger button with aria-label", () => {
    render(<Navbar />);
    expect(screen.getByRole("button", { name: /toggle menu/i })).toBeInTheDocument();
  });
});

describe("Navbar — mobile menu toggle", () => {
  it("mobile menu is hidden initially", () => {
    render(<Navbar />);
    // Mobile menu container: search for unique mobile-only text that appears only when open
    expect(screen.queryAllByRole("button", { name: /how it works/i })).toHaveLength(1);
  });

  it("opens mobile menu on hamburger click", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: /toggle menu/i }));
    // Two buttons now: desktop + mobile
    expect(screen.getAllByRole("button", { name: /how it works/i })).toHaveLength(2);
  });

  it("closes mobile menu on second hamburger click", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const hamburger = screen.getByRole("button", { name: /toggle menu/i });
    await user.click(hamburger);
    await user.click(hamburger);
    expect(screen.getAllByRole("button", { name: /how it works/i })).toHaveLength(1);
  });

  it("closes mobile menu when a nav link inside it is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: /toggle menu/i }));
    const mobileLinks = screen.getAllByRole("button", { name: /how it works/i });
    await user.click(mobileLinks[mobileLinks.length - 1]);
    expect(screen.getAllByRole("button", { name: /how it works/i })).toHaveLength(1);
  });
});

describe("Navbar — scroll behaviour", () => {
  it("header starts without scrolled styles", () => {
    const { container } = render(<Navbar />);
    const header = container.querySelector("header")!;
    expect(header.className).not.toMatch(/backdrop-blur/);
  });

  it("adds scrolled styles after a scroll event beyond 10px", () => {
    const { container } = render(<Navbar />);
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 50, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    const header = container.querySelector("header")!;
    expect(header.className).toMatch(/backdrop-blur/);
  });

  it("removes scrolled styles when scrolling back above 10px", () => {
    const { container } = render(<Navbar />);
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 50, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    const header = container.querySelector("header")!;
    expect(header.className).not.toMatch(/backdrop-blur/);
  });

  it("calls window.scrollTo when a nav link is clicked", async () => {
    const user = userEvent.setup();
    // Add a dummy target element for querySelector
    const section = document.createElement("section");
    section.id = "how-it-works";
    document.body.appendChild(section);

    render(<Navbar />);
    await user.click(screen.getAllByRole("button", { name: /how it works/i })[0]);
    expect(window.scrollTo).toHaveBeenCalled();

    document.body.removeChild(section);
  });
});
