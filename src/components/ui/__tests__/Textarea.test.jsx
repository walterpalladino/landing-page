import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Textarea from "../Textarea";

describe("Textarea", () => {
  it("renders with label", () => {
    render(<Textarea id="m" name="m" label="Message" value="" onChange={() => {}} />);
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("displays the current value", () => {
    render(<Textarea id="m" name="m" label="Message" value="Hello" onChange={() => {}} />);
    expect(screen.getByLabelText("Message")).toHaveValue("Hello");
  });

  it("calls onChange when user types", () => {
    const onChange = vi.fn();
    render(<Textarea id="m" name="m" label="Message" value="" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hi" } });
    expect(onChange).toHaveBeenCalledOnce();
  });

  it("sets rows attribute", () => {
    render(<Textarea id="m" name="m" label="Message" value="" onChange={() => {}} rows={8} />);
    expect(screen.getByLabelText("Message")).toHaveAttribute("rows", "8");
  });
});
