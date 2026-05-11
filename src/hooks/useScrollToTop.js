import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * useScrollToTop
 * Scrolls the window to the top whenever the pathname changes.
 * Handles both smooth-scroll-enabled and instant scenarios.
 */
export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
}
