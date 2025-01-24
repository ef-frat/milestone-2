import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Cart from "@/components/Cart";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/context/CartContext", () => ({
  useCart: jest.fn(),
}));

describe("Cart Component", () => {
  const mockOnClose = jest.fn();
  const mockClearCart = jest.fn();
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [
        { id: 1, title: "Product 1", price: 10.99, image: "https://via.placeholder.com/150", quantity: 2 },
      ],
      clearCart: mockClearCart,
    });
  });

  it("renders the cart with items", () => {
    render(<Cart isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText("🛒 Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Total: $21.98")).toBeInTheDocument();
  });

  it("calls onClose when the overlay is clicked", () => {
    render(<Cart isOpen={true} onClose={mockOnClose} />);

    const overlay = screen.getByTestId("cart-overlay");
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("navigates to the checkout page when the Checkout button is clicked", () => {
    render(<Cart isOpen={true} onClose={mockOnClose} />);

    const checkoutButton = screen.getByRole("button", { name: /checkout/i });
    fireEvent.click(checkoutButton);

    expect(mockRouterPush).toHaveBeenCalledWith("/checkout");
  });
});