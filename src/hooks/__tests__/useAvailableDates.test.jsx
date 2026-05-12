import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useAvailableDates } from "../useAvailableDates";

// Mock the service so tests don't depend on timing
vi.mock("../../services/appointmentService", () => ({
  getAvailableDates: vi.fn(),
}));

import { getAvailableDates } from "../../services/appointmentService";

const MOCK_DATES = [
  { date: "2030-06-09", label: "Monday, June 9",    slots: ["09:00", "10:00"] },
  { date: "2030-06-10", label: "Tuesday, June 10",  slots: ["14:00"]          },
];

const wrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

describe("useAvailableDates", () => {
  beforeEach(() => {
    getAvailableDates.mockResolvedValue(MOCK_DATES);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("starts in loading state with empty dates", () => {
    const { result } = renderHook(() => useAvailableDates(), { wrapper });
    expect(result.current.loading).toBe(true);
    expect(result.current.dates).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("populates dates after the fetch resolves", async () => {
    const { result } = renderHook(() => useAvailableDates(), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.dates).toEqual(MOCK_DATES);
  });

  it("sets loading to false after fetch resolves", async () => {
    const { result } = renderHook(() => useAvailableDates(), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));
  });

  it("error remains null on successful fetch", async () => {
    const { result } = renderHook(() => useAvailableDates(), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeNull();
  });

  it("sets error when the service rejects", async () => {
    const boom = new Error("Network error");
    getAvailableDates.mockRejectedValueOnce(boom);

    const { result } = renderHook(() => useAvailableDates(), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(boom);
    expect(result.current.dates).toEqual([]);
  });

  it("exposes a refresh function", () => {
    const { result } = renderHook(() => useAvailableDates(), { wrapper });
    expect(typeof result.current.refresh).toBe("function");
  });

  it("re-fetches when refresh() is called", async () => {
    const { result } = renderHook(() => useAvailableDates(), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(getAvailableDates).toHaveBeenCalledTimes(1);

    result.current.refresh();
    await waitFor(() => expect(getAvailableDates).toHaveBeenCalledTimes(2));
  });

  it("calls getAvailableDates exactly once on mount", async () => {
    renderHook(() => useAvailableDates(), { wrapper });
    await waitFor(() => expect(getAvailableDates).toHaveBeenCalledTimes(1));
  });
});
