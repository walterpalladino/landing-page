import { useState } from "react";
import "./LoginPage.css";

export default function LoginPage({ onLogin, isLoading, error }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ username, password });
  };

  return (
    <div className="login-page">
      <div className="login-page__card">
        {/* Brand */}
        <div className="login-page__brand">
          <span className="login-page__logo-mark">◈</span>
          <span className="login-page__logo-text">MERIDIAN</span>
        </div>

        <h1 className="login-page__title">Admin Access</h1>
        <p className="login-page__subtitle">
          Sign in to manage your landing page content.
        </p>

        <form className="login-page__form" onSubmit={handleSubmit} noValidate>
          <div className="login-field">
            <label htmlFor="username" className="login-field__label">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="login-field__input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="username"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password" className="login-field__label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="login-field__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="login-page__error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-page__submit"
            disabled={isLoading || !username || !password}
          >
            {isLoading ? "Signing in…" : "Sign In →"}
          </button>
        </form>
      </div>
    </div>
  );
}
