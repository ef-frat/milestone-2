import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginModal from "../components/LoginModal";

// Mock window.alert
global.alert = jest.fn();

// Mock functions
const mockOnClose = jest.fn();
const mockOnSuccess = jest.fn();

// Helper function to render LoginModal
const renderLoginModal = () => {
  return render(<LoginModal onClose={mockOnClose} onSuccess={mockOnSuccess} />);
};

describe("LoginModal Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the login modal", () => {
    renderLoginModal();

    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("should update email and password input fields", () => {
    renderLoginModal();

    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("should call onClose when Cancel button is clicked", () => {
    renderLoginModal();

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should show an alert when submitting with empty fields", () => {
    renderLoginModal();

    fireEvent.submit(screen.getByTestId("login-form")); // ✅ Fixed: Using test ID

    expect(global.alert).toHaveBeenCalledWith("Please enter both email and password");
  });

  it("should call onSuccess when valid credentials are entered and form is submitted", () => {
    renderLoginModal();

    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });

    fireEvent.submit(screen.getByTestId("login-form")); // ✅ Fixed: Using test ID

    expect(mockOnSuccess).toHaveBeenCalled(); // ✅ Ensuring it was called
  });
});