import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useForm } from "../useForm";

const INITIAL = { name: "", email: "" };

describe("useForm", () => {
  it("initialises with provided values", () => {
    const { result } = renderHook(() => useForm(INITIAL));
    expect(result.current.values).toEqual(INITIAL);
    expect(result.current.submitted).toBe(false);
  });

  it("updates a field via handleChange", () => {
    const { result } = renderHook(() => useForm(INITIAL));
    act(() => {
      result.current.handleChange({ target: { name: "name", value: "Jane" } });
    });
    expect(result.current.values.name).toBe("Jane");
  });

  it("sets submitted to true after handleSubmit", () => {
    const { result } = renderHook(() => useForm(INITIAL));
    const onSubmit = vi.fn();
    act(() => {
      result.current.handleSubmit(onSubmit)({ preventDefault: vi.fn() });
    });
    expect(result.current.submitted).toBe(true);
    expect(onSubmit).toHaveBeenCalledWith(INITIAL);
  });

  it("resets values and submitted state on reset()", () => {
    const { result } = renderHook(() => useForm(INITIAL));
    act(() => {
      result.current.handleChange({ target: { name: "name", value: "Jane" } });
      result.current.handleSubmit(vi.fn())({ preventDefault: vi.fn() });
    });
    act(() => result.current.reset());
    expect(result.current.values).toEqual(INITIAL);
    expect(result.current.submitted).toBe(false);
  });
});
