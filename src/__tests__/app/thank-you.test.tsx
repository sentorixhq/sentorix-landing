import { render, screen } from "@testing-library/react";
import ThankYou from "@/app/thank-you/page";

// next/link is handled by next/jest automatically
describe("ThankYou page", () => {
  it("renders the main heading", () => {
    render(<ThankYou />);
    expect(
      screen.getByRole("heading", { name: /thanks — we'll be in touch within 24 hours/i })
    ).toBeInTheDocument();
  });

  it("renders the 'while you wait' subtitle", () => {
    render(<ThankYou />);
    expect(screen.getByText(/while you wait, explore the sentorix docs/i)).toBeInTheDocument();
  });

  it("renders the View documentation link", () => {
    render(<ThankYou />);
    expect(screen.getByRole("link", { name: /view documentation/i })).toBeInTheDocument();
  });

  it("documentation link points to GitHub docs", () => {
    render(<ThankYou />);
    const link = screen.getByRole("link", { name: /view documentation/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("github.com/sentorixhq/sentorix-docs"));
  });

  it("documentation link opens in new tab", () => {
    render(<ThankYou />);
    const link = screen.getByRole("link", { name: /view documentation/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the Try the API link", () => {
    render(<ThankYou />);
    expect(screen.getByRole("link", { name: /try the api/i })).toBeInTheDocument();
  });

  it("API link points to the health endpoint", () => {
    render(<ThankYou />);
    const link = screen.getByRole("link", { name: /try the api/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("api.sentorix.io"));
  });

  it("API link opens in new tab", () => {
    render(<ThankYou />);
    const link = screen.getByRole("link", { name: /try the api/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders Back to home link", () => {
    render(<ThankYou />);
    expect(screen.getByRole("link", { name: /back to home/i })).toBeInTheDocument();
  });

  it("Back to home link points to /", () => {
    render(<ThankYou />);
    expect(screen.getByRole("link", { name: /back to home/i })).toHaveAttribute("href", "/");
  });
});
