import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";

const setup = (path = "/") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <ScrollToTop />
    </MemoryRouter>
  );

describe("ScrollToTop", () => {
  beforeEach(() => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  it("renders nothing into the DOM", () => {
    const { container } = setup();
    expect(container.firstChild).toBeNull();
  });

  it("calls window.scrollTo on mount", () => {
    setup();
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "instant" });
  });

  it("scrolls to top when rendered at a non-root path", () => {
    setup("/services/brand-strategy");
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "instant" });
  });
});
