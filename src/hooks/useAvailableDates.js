import { useState, useEffect } from "react";
import { getAvailableDates } from "../services/appointmentService";

/**
 * useAvailableDates
 *
 * Fetches available appointment dates from the appointment service.
 *
 * Returns:
 *   dates    — array of { date, label, slots[] }, empty while loading
 *   loading  — true during the initial fetch
 *   error    — Error object if the fetch failed, otherwise null
 *   refresh  — call this to re-fetch (e.g. after a failed attempt)
 */
export function useAvailableDates() {
  const [dates,   setDates]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [tick,    setTick]    = useState(0);         // bumped by refresh()

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    getAvailableDates()
      .then((data) => {
        if (!cancelled) {
          setDates(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [tick]);

  const refresh = () => setTick((t) => t + 1);

  return { dates, loading, error, refresh };
}
