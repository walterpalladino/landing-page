import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";
import { NAV_LINKS, SOCIAL_LINKS } from "../../../services/contentService";

describe("Footer", () => {
  it("renders the footer element", () => {
    const { container } = render(<Footer />);
    expect(container.querySelector("footer.footer")).toBeInTheDocument();
  });

  it("renders the logo", () => {
    render(<Footer />);
    expect(screen.getAllByText("MERIDIAN").length).toBeGreaterThan(0);
  });

  it("renders the tagline", () => {
    render(<Footer />);
    expect(screen.getByText(/Creative studio for/i)).toBeInTheDocument();
  });

  it("renders all social link icons", () => {
    render(<Footer />);
    SOCIAL_LINKS.forEach(({ icon }) => expect(screen.getByText(icon)).toBeInTheDocument());
  });

  it("social links have aria-labels", () => {
    render(<Footer />);
    SOCIAL_LINKS.forEach(({ label }) => expect(screen.getByLabelText(label)).toBeInTheDocument());
  });

  it("renders all nav links", () => {
    render(<Footer />);
    NAV_LINKS.forEach(({ label }) =>
      expect(screen.getAllByText(label).length).toBeGreaterThan(0)
    );
  });

  it("renders Navigation column heading", () => {
    render(<Footer />);
    expect(screen.getByText("Navigation")).toBeInTheDocument();
  });

  it("renders Services column heading", () => {
    const { container } = render(<Footer />);
    const titles = container.querySelectorAll(".footer__col-title");
    expect(Array.from(titles).some(el => el.textContent === "Services")).toBe(true);
  });

  it("renders Contact column heading", () => {
    const { container } = render(<Footer />);
    const titles = container.querySelectorAll(".footer__col-title");
    expect(Array.from(titles).some(el => el.textContent === "Contact")).toBe(true);
  });

  it("renders email and phone", () => {
    render(<Footer />);
    expect(screen.getAllByText("hello@meridian.studio").length).toBeGreaterThan(0);
    expect(screen.getAllByText("+1 (555) 123-4567").length).toBeGreaterThan(0);
  });

  it("renders the address", () => {
    render(<Footer />);
    expect(screen.getByText(/123 Studio Row/i)).toBeInTheDocument();
  });

  it("renders copyright with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${year} Meridian Studio`))).toBeInTheDocument();
  });

  it("renders legal links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /terms of use/i   })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cookies/i        })).toBeInTheDocument();
  });
});
