import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DatePicker from "../DatePicker";

describe("DatePicker", () => {
  it("renders with label", () => {
    render(<DatePicker id="d" name="d" label="Preferred Date" value="" onChange={() => {}} />);
    expect(screen.getByLabelText("Preferred Date")).toBeInTheDocument();
  });

  it("renders an input of type date", () => {
    render(<DatePicker id="d" name="d" label="Preferred Date" value="" onChange={() => {}} />);
    expect(screen.getByLabelText("Preferred Date")).toHaveAttribute("type", "date");
  });

  it("sets a min attribute to today or later", () => {
    render(<DatePicker id="d" name="d" label="Preferred Date" value="" onChange={() => {}} />);
    const input = screen.getByLabelText("Preferred Date");
    const today = new Date().toISOString().split("T")[0];
    expect(input).toHaveAttribute("min", today);
  });

  it("displays the current value", () => {
    render(<DatePicker id="d" name="d" label="Preferred Date" value="2030-01-15" onChange={() => {}} />);
    expect(screen.getByLabelText("Preferred Date")).toHaveValue("2030-01-15");
  });

  it("calls onChange when a date is chosen", () => {
    const onChange = vi.fn();
    render(<DatePicker id="d" name="d" label="Preferred Date" value="" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText("Preferred Date"), { target: { value: "2030-06-10" } });
    expect(onChange).toHaveBeenCalledOnce();
  });

  it("marks the input required when prop is set", () => {
    render(<DatePicker id="d" name="d" label="Preferred Date" value="" onChange={() => {}} required />);
    expect(screen.getByLabelText("Preferred Date")).toBeRequired();
  });
});
