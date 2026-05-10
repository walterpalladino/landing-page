import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactSection from "../ContactSection";

describe("ContactSection", () => {
  it("renders section with id='contact'", () => {
    const { container } = render(<ContactSection />);
    expect(container.querySelector("#contact")).toBeInTheDocument();
  });

  it("renders the section label", () => {
    render(<ContactSection />);
    expect(screen.getByText(/04 \/ Contact/i)).toBeInTheDocument();
  });

  it("renders the heading", () => {
    render(<ContactSection />);
    expect(screen.getByText(/Let's build/i)).toBeInTheDocument();
    expect(screen.getByText("remarkable.")).toBeInTheDocument();
  });

  it("renders contact details", () => {
    render(<ContactSection />);
    expect(screen.getByText("hello@meridian.studio")).toBeInTheDocument();
    expect(screen.getByText("+1 (555) 123-4567")).toBeInTheDocument();
    expect(screen.getByText(/New York \/ Remote/i)).toBeInTheDocument();
  });

  it("email link has correct href", () => {
    render(<ContactSection />);
    expect(screen.getByRole("link", { name: /hello@meridian/i }))
      .toHaveAttribute("href", "mailto:hello@meridian.studio");
  });

  it("phone link has correct href", () => {
    render(<ContactSection />);
    expect(screen.getByRole("link", { name: /\+1 \(555\)/i }))
      .toHaveAttribute("href", "tel:+15551234567");
  });

  it("renders all form fields", () => {
    render(<ContactSection />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Service of interest")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("updates fields on user input", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);
    await user.type(screen.getByLabelText("Name"), "Jane");
    expect(screen.getByLabelText("Name")).toHaveValue("Jane");
  });

  it("selects a service option", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);
    await user.selectOptions(screen.getByLabelText("Service of interest"), "Brand Strategy");
    expect(screen.getByLabelText("Service of interest")).toHaveValue("Brand Strategy");
  });

  it("shows success state after submission", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);
    await user.type(screen.getByLabelText("Name"), "Jane");
    await user.type(screen.getByLabelText("Email"), "jane@example.com");
    await user.type(screen.getByLabelText("Message"), "Hello");
    fireEvent.submit(screen.getByRole("button", { name: /send message/i }).closest("form"));
    await waitFor(() => expect(screen.getByText("Message received.")).toBeInTheDocument());
  });

  it("hides form after submission", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);
    await user.type(screen.getByLabelText("Name"), "Jane");
    await user.type(screen.getByLabelText("Email"), "jane@example.com");
    await user.type(screen.getByLabelText("Message"), "Hello");
    fireEvent.submit(screen.getByRole("button", { name: /send message/i }).closest("form"));
    await waitFor(() => expect(screen.queryByLabelText("Name")).not.toBeInTheDocument());
  });

  it("resets form when 'Send another' is clicked", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);
    await user.type(screen.getByLabelText("Name"), "Jane");
    await user.type(screen.getByLabelText("Email"), "jane@example.com");
    await user.type(screen.getByLabelText("Message"), "Hello");
    fireEvent.submit(screen.getByRole("button", { name: /send message/i }).closest("form"));
    await waitFor(() => screen.getByRole("button", { name: /send another/i }));
    await user.click(screen.getByRole("button", { name: /send another/i }));
    expect(screen.getByLabelText("Name")).toHaveValue("");
  });
});
