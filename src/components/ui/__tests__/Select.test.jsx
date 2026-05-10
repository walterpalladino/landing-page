import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "../Select";

const OPTIONS = ["Brand Strategy", "Digital Experience"];

describe("Select", () => {
  it("renders with label", () => {
    render(<Select id="s" name="s" label="Service" value="" onChange={() => {}} options={OPTIONS} />);
    expect(screen.getByLabelText("Service")).toBeInTheDocument();
  });

  it("renders all options plus placeholder", () => {
    render(<Select id="s" name="s" label="Service" value="" onChange={() => {}} options={OPTIONS} />);
    expect(screen.getByRole("option", { name: /select a service/i })).toBeInTheDocument();
    OPTIONS.forEach(o => expect(screen.getByRole("option", { name: o })).toBeInTheDocument());
  });

  it("calls onChange when an option is selected", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Select id="s" name="s" label="Service" value="" onChange={onChange} options={OPTIONS} />);
    await user.selectOptions(screen.getByLabelText("Service"), "Brand Strategy");
    expect(onChange).toHaveBeenCalled();
  });
});
