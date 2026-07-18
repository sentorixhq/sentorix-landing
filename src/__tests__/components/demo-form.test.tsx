import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DemoForm } from "@/components/demo-form";

const mockFetch = jest.fn();

beforeEach(() => {
  global.fetch = mockFetch;
  mockFetch.mockClear();
});

describe("DemoForm — content", () => {
  it("renders the section heading", () => {
    render(<DemoForm />);
    expect(screen.getByText(/see sentorix in action/i)).toBeInTheDocument();
  });

  it("renders all 6 demo benefits", () => {
    render(<DemoForm />);
    expect(screen.getByText(/live pii detection on your actual prompts/i)).toBeInTheDocument();
    expect(screen.getByText(/policy configuration walkthrough/i)).toBeInTheDocument();
    expect(screen.getByText(/audit log and compliance report demo/i)).toBeInTheDocument();
    expect(screen.getByText(/integration guide for your tech stack/i)).toBeInTheDocument();
    expect(screen.getByText(/answers to your compliance questions/i)).toBeInTheDocument();
    expect(screen.getByText(/pricing tailored to your usage/i)).toBeInTheDocument();
  });

  it("renders all required form fields", () => {
    render(<DemoForm />);
    expect(screen.getByPlaceholderText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("jane@company.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Acme Corp")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/customer support chatbot/i)).toBeInTheDocument();
  });

  it("renders all 5 role options in the Role select", () => {
    render(<DemoForm />);
    const roleSelect = screen.getByDisplayValue("Select your role");
    const roleOptions = within(roleSelect.parentElement!).getAllByRole("option");
    const roleLabels = roleOptions.map((o) => o.textContent);
    expect(roleLabels).toContain("CTO / VP Engineering");
    expect(roleLabels).toContain("CISO / Head of Security");
    expect(roleLabels).toContain("Compliance / Legal");
    expect(roleLabels).toContain("Developer / Engineer");
    expect(roleLabels).toContain("Other");
  });

  it("renders all 5 company size options", () => {
    render(<DemoForm />);
    const sizeSelect = screen.getByDisplayValue("Select company size");
    const options = within(sizeSelect.parentElement!).getAllByRole("option");
    const labels = options.map((o) => o.textContent);
    expect(labels).toContain("1-10");
    expect(labels).toContain("11-50");
    expect(labels).toContain("51-200");
    expect(labels).toContain("201-1000");
    expect(labels).toContain("1000+");
  });

  it("renders all 4 AI provider checkboxes", () => {
    render(<DemoForm />);
    expect(screen.getByRole("checkbox", { name: "OpenAI" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Anthropic" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "AWS Bedrock" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Other" })).toBeInTheDocument();
  });

  it("all provider checkboxes start unchecked", () => {
    render(<DemoForm />);
    screen.getAllByRole("checkbox").forEach((cb) => expect(cb).not.toBeChecked());
  });

  it("renders submit button with correct text", () => {
    render(<DemoForm />);
    expect(screen.getByRole("button", { name: /request your demo/i })).toBeInTheDocument();
  });

  it("renders no sales pressure notice", () => {
    render(<DemoForm />);
    expect(screen.getByText(/no sales pressure/i)).toBeInTheDocument();
    expect(screen.getByText(/response within 24 hours/i)).toBeInTheDocument();
  });
});

describe("DemoForm — provider toggle", () => {
  it("checking a provider marks it checked", async () => {
    const user = userEvent.setup();
    render(<DemoForm />);
    const openai = screen.getByRole("checkbox", { name: "OpenAI" });
    await user.click(openai);
    expect(openai).toBeChecked();
  });

  it("unchecking a selected provider marks it unchecked", async () => {
    const user = userEvent.setup();
    render(<DemoForm />);
    const openai = screen.getByRole("checkbox", { name: "OpenAI" });
    await user.click(openai);
    await user.click(openai);
    expect(openai).not.toBeChecked();
  });

  it("multiple providers can be selected simultaneously", async () => {
    const user = userEvent.setup();
    render(<DemoForm />);
    await user.click(screen.getByRole("checkbox", { name: "OpenAI" }));
    await user.click(screen.getByRole("checkbox", { name: "Anthropic" }));
    expect(screen.getByRole("checkbox", { name: "OpenAI" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Anthropic" })).toBeChecked();
  });

  it("toggling one provider does not affect others", async () => {
    const user = userEvent.setup();
    render(<DemoForm />);
    await user.click(screen.getByRole("checkbox", { name: "OpenAI" }));
    await user.click(screen.getByRole("checkbox", { name: "OpenAI" }));
    expect(screen.getByRole("checkbox", { name: "Anthropic" })).not.toBeChecked();
  });
});

describe("DemoForm — required field attributes", () => {
  it("name input is required", () => {
    render(<DemoForm />);
    expect(screen.getByPlaceholderText("Jane Smith")).toHaveAttribute("required");
  });

  it("email input is required", () => {
    render(<DemoForm />);
    expect(screen.getByPlaceholderText("jane@company.com")).toHaveAttribute("required");
  });

  it("email input has type email", () => {
    render(<DemoForm />);
    expect(screen.getByPlaceholderText("jane@company.com")).toHaveAttribute("type", "email");
  });

  it("company input is required", () => {
    render(<DemoForm />);
    expect(screen.getByPlaceholderText("Acme Corp")).toHaveAttribute("required");
  });
});

describe("DemoForm — form submission", () => {
  const submitForm = () =>
    fireEvent.submit(
      screen.getByRole("button", { name: /request your demo/i }).closest("form")!
    );

  it("shows 'Submitting…' and disables button during submission", async () => {
    mockFetch.mockReturnValue(new Promise(() => {})); // never resolves
    render(<DemoForm />);
    submitForm();
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /submitting/i })).toBeDisabled();
    });
  });

  it("calls fetch with POST and no error shown on successful response (redirect not verifiable in jsdom)", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });
    render(<DemoForm />);
    submitForm();
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    // Verify the success branch was taken: no error is displayed
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/network error/i)).not.toBeInTheDocument();
  });

  it("shows error message when server returns non-ok status", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });
    render(<DemoForm />);
    submitForm();
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("shows network error message when fetch throws", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network failure"));
    render(<DemoForm />);
    submitForm();
    expect(await screen.findByText(/network error/i)).toBeInTheDocument();
  });

  it("re-enables submit button after error", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });
    render(<DemoForm />);
    submitForm();
    await screen.findByText(/something went wrong/i);
    expect(screen.getByRole("button", { name: /request your demo/i })).not.toBeDisabled();
  });

  it("calls fetch with POST method and Formspree endpoint", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });
    render(<DemoForm />);
    submitForm();
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toMatch(/formspree\.io\/f\//);
    expect(options.method).toBe("POST");
    expect((options.headers as Record<string, string>)["Accept"]).toBe("application/json");
  });

  it("shows no error message before submission", () => {
    render(<DemoForm />);
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/network error/i)).not.toBeInTheDocument();
  });
});
