import { render, screen, act, waitFor } from "@testing-library/react";
import { CartProvider, useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { ReactNode } from "react";

// Mock toast notifications
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    dismiss: jest.fn(),
  },
}));

// Test Component to interact with CartContext
const TestComponent = () => {
  const { cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();

  return (
    <div>
      <p data-testid="cart-count">{cartItems.length}</p>
      <button onClick={() => addToCart({ id: 1, title: "Test Product", price: 100, image: "test.jpg", quantity: 1 })}>
        Add Item
      </button>
      <button onClick={() => removeFromCart(1)}>Remove Item</button>
      <button onClick={() => increaseQuantity(1)}>Increase Quantity</button>
      <button onClick={() => decreaseQuantity(1)}>Decrease Quantity</button>
      <button onClick={() => clearCart(true)}>Clear Cart</button> {/* ✅ Use silent mode */}
    </div>
  );
};

// Utility function to render with CartProvider
const renderWithProvider = (ui: ReactNode) => render(<CartProvider>{ui}</CartProvider>);

// Reset mocks before each test to avoid state carry-over
beforeEach(() => {
  jest.clearAllMocks();
});

describe("CartContext", () => {
  it("should add an item to the cart", async () => {
    renderWithProvider(<TestComponent />);

    const cartCount = screen.getByTestId("cart-count");
    expect(cartCount.textContent).toBe("0");

    await act(async () => {
      screen.getByText("Add Item").click();
    });

    await waitFor(() => {
      expect(cartCount.textContent).toBe("1");
      expect(toast.success).toHaveBeenCalledWith("Item added to cart.");
    });
  });

  it("should remove an item from the cart", async () => {
    renderWithProvider(<TestComponent />);

    await act(async () => {
      screen.getByText("Add Item").click();
    });

    await act(async () => {
      screen.getByText("Remove Item").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("cart-count").textContent).toBe("0");
      expect(toast.warn).toHaveBeenCalledWith(expect.stringContaining("Removed"));
    });
  });

  it("should increase item quantity", async () => {
    renderWithProvider(<TestComponent />);

    await act(async () => {
      screen.getByText("Add Item").click();
      screen.getByText("Increase Quantity").click();
    });

    await waitFor(() => {
      expect(toast.info).toHaveBeenCalledWith("➕ Quantity increased.");
    });
  });

  it("should decrease item quantity (not below 1)", async () => {
    renderWithProvider(<TestComponent />);

    await act(async () => {
      screen.getByText("Add Item").click();
      screen.getByText("Decrease Quantity").click();
    });

    await waitFor(() => {
      expect(toast.info).toHaveBeenCalledWith("➖ Quantity decreased.");
    });
  });

  it("should clear the cart", async () => {
    renderWithProvider(<TestComponent />);

    await act(async () => {
      screen.getByText("Add Item").click();
    });

    await act(async () => {
      screen.getByText("Clear Cart").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("cart-count").textContent).toBe("0");
    });

    expect(toast.info).not.toHaveBeenCalledWith(expect.stringContaining("Are you sure")); // ✅ Ensures silent mode was used
  });
});