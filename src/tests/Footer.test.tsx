import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";
import Link from "next/link";

// Mock Next.js Link to avoid hydration errors
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("Footer Component", () => {
  it("should render the footer", () => {
    render(<Footer />);
    
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
  });

  it("should contain correct navigation links", () => {
    render(<Footer />);

    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("About").closest("a")).toHaveAttribute("href", "/about");
    expect(screen.getByText("Contact").closest("a")).toHaveAttribute("href", "/contact");
    expect(screen.getByText("Privacy Policy").closest("a")).toHaveAttribute("href", "/privacy-policy");
    expect(screen.getByText("Terms of Service").closest("a")).toHaveAttribute("href", "/terms-of-service");
  });

  it("should contain correct social media links", () => {
    render(<Footer />);

    expect(screen.getByText("Twitter").closest("a")).toHaveAttribute("href", "https://twitter.com");
    expect(screen.getByText("Instagram").closest("a")).toHaveAttribute("href", "https://instagram.com");
    expect(screen.getByText("Facebook").closest("a")).toHaveAttribute("href", "https://facebook.com");
  });

  it("should display the correct copyright year", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Shop Smart. All rights reserved.`)).toBeInTheDocument();
  });
});