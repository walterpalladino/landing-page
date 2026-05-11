import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { useScrollToTop } from "../useScrollToTop";

// Wrap the hook inside a router so useLocation works
const wrapper = ({ children, path = "/" }) => (
  <MemoryRouter initialEntries={[path]}>{children}</MemoryRouter>
);

describe("useScrollToTop", () => {
  beforeEach(() => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  it("calls window.scrollTo on initial render", () => {
    renderHook(() => useScrollToTop(), { wrapper });
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "instant" });
  });

  it("calls window.scrollTo with top:0 and behavior:instant", () => {
    renderHook(() => useScrollToTop(), { wrapper });
    const [call] = window.scrollTo.mock.calls;
    expect(call[0]).toEqual({ top: 0, behavior: "instant" });
  });
});
