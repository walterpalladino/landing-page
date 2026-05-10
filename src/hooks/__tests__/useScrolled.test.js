import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { useScrolled } from "../useScrolled";

describe("useScrolled", () => {
  it("returns false on initial render", () => {
    const { result } = renderHook(() => useScrolled(40));
    expect(result.current).toBe(false);
  });

  it("returns true after scrolling past the threshold", () => {
    const { result } = renderHook(() => useScrolled(40));
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 100, writable: true });
      fireEvent.scroll(window);
    });
    expect(result.current).toBe(true);
  });

  it("returns false when scrolled back above threshold", () => {
    const { result } = renderHook(() => useScrolled(40));
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 100, writable: true });
      fireEvent.scroll(window);
    });
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 0, writable: true });
      fireEvent.scroll(window);
    });
    expect(result.current).toBe(false);
  });

  it("accepts a custom threshold", () => {
    const { result } = renderHook(() => useScrolled(200));
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 100, writable: true });
      fireEvent.scroll(window);
    });
    expect(result.current).toBe(false);

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 250, writable: true });
      fireEvent.scroll(window);
    });
    expect(result.current).toBe(true);
  });
});
