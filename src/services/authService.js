/**
 * authService.js
 *
 * Authentication service for the admin area.
 * Currently validates against fixed credentials.
 * Replace `validateCredentials` with a real API call when a backend is ready.
 */

/** Fixed admin credentials. Change these or swap the implementation for production. */
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "meridian2024",
};

/**
 * Validates a username / password pair.
 * Returns a promise so the signature matches a real HTTP call.
 *
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function validateCredentials({ username, password }) {
  // Simulate a short network round-trip
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  ) {
    return { success: true };
  }

  return { success: false, error: "Invalid username or password." };
}

/** Session storage key used by useAuth. */
export const AUTH_SESSION_KEY = "meridian_admin_auth";
