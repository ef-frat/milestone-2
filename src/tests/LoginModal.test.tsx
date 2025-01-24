import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginModal from "@/components/LoginModal";

describe("LoginModal Component", () => {
  const mockOnClose = jest.fn();
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the LoginModal with all required elements", () => {
    render(<LoginModal onClose={mockOnClose} onSuccess={mockOnSuccess} />);

    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("calls onSuccess when email and password are provided and login is submitted", () => {
    render(<LoginModal onClose={mockOnClose} onSuccess={mockOnSuccess} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(mockOnSuccess).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the Cancel button is clicked", () => {
    render(<LoginModal onClose={mockOnClose} onSuccess={mockOnSuccess} />);

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});