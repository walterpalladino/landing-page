import { useScrollToTop } from "../../hooks/useScrollToTop";

/**
 * ScrollToTop
 * Drop this component anywhere inside a Router context.
 * It renders nothing — it just resets scroll position on every navigation.
 */
export default function ScrollToTop() {
  useScrollToTop();
  return null;
}
