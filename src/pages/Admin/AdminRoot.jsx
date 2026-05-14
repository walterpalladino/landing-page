import { useAuth } from "../../hooks/useAuth";
import LoginPage   from "./LoginPage";
import AdminPage   from "./AdminPage";

/**
 * AdminRoot
 * Entry point for /admin — renders LoginPage or AdminPage
 * depending on authentication state managed by useAuth.
 */
export default function AdminRoot() {
  const { isAuthenticated, isLoading, error, login, logout } = useAuth();

  if (isAuthenticated) {
    return <AdminPage onLogout={logout} />;
  }

  return <LoginPage onLogin={login} isLoading={isLoading} error={error} />;
}
