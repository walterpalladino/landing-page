import { useState, useCallback } from "react";
import { validateCredentials, AUTH_SESSION_KEY } from "../services/authService";

/**
 * useAuth
 *
 * Manages admin authentication state.
 * Session is persisted in sessionStorage so a page refresh keeps the user logged in
 * within the same browser tab, but clears when the tab is closed.
 *
 * Returns:
 *   isAuthenticated — true when the user has successfully logged in
 *   isLoading       — true while the credential validation is in flight
 *   error           — validation error message, or null
 *   login(credentials) — async, calls authService and updates state
 *   logout()           — clears session and resets state
 */
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(AUTH_SESSION_KEY) === "true"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState(null);

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await validateCredentials(credentials);
      if (result.success) {
        sessionStorage.setItem(AUTH_SESSION_KEY, "true");
        setIsAuthenticated(true);
      } else {
        setError(result.error ?? "Login failed.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  return { isAuthenticated, isLoading, error, login, logout };
}
