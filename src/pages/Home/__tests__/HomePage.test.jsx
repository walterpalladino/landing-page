import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../HomePage";

const setup = () =>
  render(<MemoryRouter><HomePage /></MemoryRouter>);

describe("HomePage", () => {
  it("renders a <main> landmark", () => {
    setup();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("contains the hero section", () => {
    const { container } = setup();
    expect(container.querySelector(".hero")).toBeInTheDocument();
  });

  it("contains the services section", () => {
    const { container } = setup();
    expect(container.querySelector("#services")).toBeInTheDocument();
  });

  it("contains the clients section", () => {
    const { container } = setup();
    expect(container.querySelector("#clients")).toBeInTheDocument();
  });

  it("contains the contact section", () => {
    const { container } = setup();
    expect(container.querySelector("#contact")).toBeInTheDocument();
  });
});
