import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ForDevelopers } from "@/components/for-developers";

// user-event v14 setup() installs its own clipboard, overwriting any beforeEach mock.
// For tests that only assert UI state (Copied! appearing), that's fine.
// For tests that assert on the mock itself, we reinstall AFTER setup() runs.
function installClipboardMock() {
  const writeTextMock = jest.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: writeTextMock },
    configurable: true,
    writable: true,
  });
  return writeTextMock;
}

describe("ForDevelopers — content", () => {
  it("renders the main heading", () => {
    render(<ForDevelopers />);
    expect(screen.getByText(/built by developers, for developers/i)).toBeInTheDocument();
  });

  it("renders the subheading", () => {
    render(<ForDevelopers />);
    expect(screen.getByText(/sentorix is designed to be invisible/i)).toBeInTheDocument();
  });

  it("renders 'OpenAI-compatible API' feature", () => {
    render(<ForDevelopers />);
    expect(screen.getByText(/openai-compatible api/i)).toBeInTheDocument();
  });

  it("renders 'Streaming response support' feature", () => {
    render(<ForDevelopers />);
    expect(screen.getByText(/streaming response support/i)).toBeInTheDocument();
  });

  it("renders 'Per-tenant policy configuration' feature", () => {
    render(<ForDevelopers />);
    expect(screen.getByText(/per-tenant policy configuration/i)).toBeInTheDocument();
  });

  it("renders 'Webhook notifications for violations' feature", () => {
    render(<ForDevelopers />);
    expect(screen.getByText(/webhook notifications for violations/i)).toBeInTheDocument();
  });

  it("renders 'Sub-20ms overhead' feature", () => {
    render(<ForDevelopers />);
    expect(screen.getByText(/sub-20ms overhead/i)).toBeInTheDocument();
  });

  it("renders section with id='for-developers'", () => {
    const { container } = render(<ForDevelopers />);
    expect(container.querySelector("#for-developers")).toBeInTheDocument();
  });
});

describe("ForDevelopers — CodeTabs tab switching", () => {
  it("renders Python, Node.js, and cURL tab buttons", () => {
    render(<ForDevelopers />);
    expect(screen.getByRole("button", { name: "Python" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Node.js" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "cURL" })).toBeInTheDocument();
  });

  it("shows Python code by default", () => {
    render(<ForDevelopers />);
    expect(screen.getByText(/import openai/i)).toBeInTheDocument();
  });

  it("switches to Node.js code when Node.js tab is clicked", async () => {
    const user = userEvent.setup();
    render(<ForDevelopers />);
    await user.click(screen.getByRole("button", { name: "Node.js" }));
    expect(screen.getByText(/import OpenAI from "openai"/)).toBeInTheDocument();
  });

  it("switches to cURL code when cURL tab is clicked", async () => {
    const user = userEvent.setup();
    render(<ForDevelopers />);
    await user.click(screen.getByRole("button", { name: "cURL" }));
    expect(screen.getByText(/curl -X POST/i)).toBeInTheDocument();
  });

  it("clicking Python after Node.js reverts to Python code", async () => {
    const user = userEvent.setup();
    render(<ForDevelopers />);
    await user.click(screen.getByRole("button", { name: "Node.js" }));
    await user.click(screen.getByRole("button", { name: "Python" }));
    expect(screen.getByText(/import openai/i)).toBeInTheDocument();
  });
});

describe("ForDevelopers — copy to clipboard", () => {
  it("renders Copy button", () => {
    render(<ForDevelopers />);
    expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument();
  });

  it("calls clipboard.writeText with the active tab's code on Copy click", async () => {
    // Install our mock AFTER userEvent.setup() so we shadow user-event's clipboard
    const user = userEvent.setup();
    const writeTextMock = installClipboardMock();
    render(<ForDevelopers />);
    await user.click(screen.getByRole("button", { name: /copy/i }));
    await waitFor(() => expect(writeTextMock).toHaveBeenCalledTimes(1));
    expect(writeTextMock.mock.calls[0][0]).toMatch(/import openai/i);
  });

  it("shows 'Copied!' after clicking Copy", async () => {
    const user = userEvent.setup();
    render(<ForDevelopers />);
    await user.click(screen.getByRole("button", { name: /copy/i }));
    expect(await screen.findByText(/copied!/i)).toBeInTheDocument();
  });

  it("reverts Copy button back after 2 seconds", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ForDevelopers />);

    await user.click(screen.getByRole("button", { name: /copy/i }));
    await waitFor(() => screen.getByText(/copied!/i));

    act(() => jest.advanceTimersByTime(2100));
    await waitFor(() =>
      expect(screen.queryByText(/copied!/i)).not.toBeInTheDocument()
    );
    jest.useRealTimers();
  });

  it("copies Node.js code when Node.js tab is active", async () => {
    // Install our mock AFTER userEvent.setup() so we shadow user-event's clipboard
    const user = userEvent.setup();
    const writeTextMock = installClipboardMock();
    render(<ForDevelopers />);
    await user.click(screen.getByRole("button", { name: "Node.js" }));
    await user.click(screen.getByRole("button", { name: /copy/i }));
    await waitFor(() => expect(writeTextMock).toHaveBeenCalledTimes(1));
    expect(writeTextMock.mock.calls[0][0]).toMatch(/import OpenAI from "openai"/);
  });
});
