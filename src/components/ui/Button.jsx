import { Link } from "react-router-dom";
import "./Button.css";

/**
 * Button — renders as:
 *   <Link to={to}>      when `to` prop is given   (internal SPA navigation)
 *   <a href={href}>     when `href` prop is given  (external / anchor links)
 *   <button>            otherwise
 *
 * Variants: "primary" | "ghost" | "ghost-dark" | "outline" | "outline-light"
 */
export default function Button({
  children,
  to,
  href,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
  ...rest
}) {
  const cls = `btn btn--${variant} ${className}`.trim();

  if (to) {
    return <Link to={to} className={cls} {...rest}>{children}</Link>;
  }

  if (href) {
    return <a href={href} className={cls} {...rest}>{children}</a>;
  }

  return (
    <button type={type} className={cls} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
