import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "../components/Cart";
import { CartProvider } from "@/context/CartContext";
import { act } from "react-dom/test-utils";
import { useRouter } from "next/router";

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockPush });

// Mock `onClose` function
const mockOnClose = jest.fn();

// Helper function to render Cart inside a provider
const renderCart = () => {
  return render(
    <CartProvider>
      <Cart isOpen={true} onClose={mockOnClose} />
    </CartProvider>
  );
};

describe("Cart Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the cart when open", () => {
    renderCart();

    expect(screen.getByTestId("cart-overlay")).toBeInTheDocument();
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
  });

  it("should close the cart when clicking the overlay", () => {
    renderCart();

    fireEvent.click(screen.getByTestId("cart-overlay"));

    expect(mockOnClose).toHaveBeenCalled();
  });
});