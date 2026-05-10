import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../Input";

describe("Input", () => {
  it("renders with label and input", () => {
    render(<Input id="n" name="n" label="Name" value="" onChange={() => {}} />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("displays the current value", () => {
    render(<Input id="n" name="n" label="Name" value="Jane" onChange={() => {}} />);
    expect(screen.getByLabelText("Name")).toHaveValue("Jane");
  });

  it("calls onChange when the user types", () => {
    const onChange = vi.fn();
    render(<Input id="n" name="n" label="Name" value="" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "J" } });
    expect(onChange).toHaveBeenCalledOnce();
  });

  it("applies placeholder", () => {
    render(<Input id="n" name="n" label="Name" value="" onChange={() => {}} placeholder="Your name" />);
    expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument();
  });

  it("sets type attribute", () => {
    render(<Input id="e" name="e" label="Email" type="email" value="" onChange={() => {}} />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
  });
});
