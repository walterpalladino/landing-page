import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Button from "../Button";

const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe("Button", () => {
  it("renders as <button> by default", () => {
    wrap(<Button>Click</Button>);
    expect(screen.getByRole("button", { name: "Click" })).toBeInTheDocument();
  });

  it("renders as <a> when href is provided (external / anchor)", () => {
    wrap(<Button href="#services">Anchor</Button>);
    const el = screen.getByRole("link", { name: "Anchor" });
    expect(el.tagName).toBe("A");
    expect(el).toHaveAttribute("href", "#services");
  });

  it("renders as a router Link when `to` is provided", () => {
    wrap(<Button to="/appointment">Book</Button>);
    const el = screen.getByRole("link", { name: "Book" });
    expect(el).toHaveAttribute("href", "/appointment");
  });

  it("prefers `to` over `href` when both are given", () => {
    wrap(<Button to="/appointment" href="#fallback">Book</Button>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/appointment");
  });

  it("applies primary variant class by default", () => {
    const { container } = wrap(<Button>Primary</Button>);
    expect(container.firstChild).toHaveClass("btn--primary");
  });

  it("applies ghost variant class", () => {
    const { container } = wrap(<Button variant="ghost">Ghost</Button>);
    expect(container.firstChild).toHaveClass("btn--ghost");
  });

  it("applies outline variant class", () => {
    const { container } = wrap(<Button variant="outline">Outline</Button>);
    expect(container.firstChild).toHaveClass("btn--outline");
  });

  it("applies outline-light variant class", () => {
    const { container } = wrap(<Button variant="outline-light">OL</Button>);
    expect(container.firstChild).toHaveClass("btn--outline-light");
  });

  it("fires onClick when clicked", () => {
    const handler = vi.fn();
    wrap(<Button onClick={handler}>Click me</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handler).toHaveBeenCalledOnce();
  });

  it("accepts extra className", () => {
    const { container } = wrap(<Button className="extra">X</Button>);
    expect(container.firstChild).toHaveClass("extra");
  });

  it("forwards type attribute to button", () => {
    wrap(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });
});
