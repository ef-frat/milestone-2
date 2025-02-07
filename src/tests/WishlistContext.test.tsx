import { render, screen, act } from "@testing-library/react";
import { WishlistProvider, useWishlist } from "../context/WishlistContext";
import { ReactNode } from "react";

// Test Component to interact with WishlistContext
const TestComponent = () => {
  const { wishlist, addToWishlist, removeFromWishlist, clearWishlist, isInWishlist } = useWishlist();

  return (
    <div>
      <p data-testid="wishlist-count">{wishlist.length}</p>
      <p data-testid="is-in-wishlist">{isInWishlist(1) ? "Yes" : "No"}</p>
      <button onClick={() => addToWishlist({ id: 1, title: "Item 1", price: 100, image: "image.jpg" })}>
        Add Item
      </button>
      <button onClick={() => removeFromWishlist(1)}>Remove Item</button>
      <button onClick={clearWishlist}>Clear Wishlist</button>
    </div>
  );
};

// Utility function to render with WishlistProvider
const renderWithProvider = (ui: ReactNode) => render(<WishlistProvider>{ui}</WishlistProvider>);

describe("WishlistContext", () => {
  it("should initialize with an empty wishlist", () => {
    renderWithProvider(<TestComponent />);

    expect(screen.getByTestId("wishlist-count").textContent).toBe("0");
    expect(screen.getByTestId("is-in-wishlist").textContent).toBe("No");
  });

  it("should add an item to the wishlist", () => {
    renderWithProvider(<TestComponent />);

    act(() => {
      screen.getByText("Add Item").click();
    });

    expect(screen.getByTestId("wishlist-count").textContent).toBe("1");
    expect(screen.getByTestId("is-in-wishlist").textContent).toBe("Yes");
  });

  it("should not add duplicate items to the wishlist", () => {
    renderWithProvider(<TestComponent />);

    act(() => {
      screen.getByText("Add Item").click();
      screen.getByText("Add Item").click(); // Try to add the same item again
    });

    expect(screen.getByTestId("wishlist-count").textContent).toBe("1"); // Still 1 item
  });

  it("should remove an item from the wishlist", () => {
    renderWithProvider(<TestComponent />);

    act(() => {
      screen.getByText("Add Item").click();
    });

    expect(screen.getByTestId("wishlist-count").textContent).toBe("1");

    act(() => {
      screen.getByText("Remove Item").click();
    });

    expect(screen.getByTestId("wishlist-count").textContent).toBe("0");
    expect(screen.getByTestId("is-in-wishlist").textContent).toBe("No");
  });

  it("should clear the wishlist", () => {
    renderWithProvider(<TestComponent />);

    act(() => {
      screen.getByText("Add Item").click();
    });

    expect(screen.getByTestId("wishlist-count").textContent).toBe("1");

    act(() => {
      screen.getByText("Clear Wishlist").click();
    });

    expect(screen.getByTestId("wishlist-count").textContent).toBe("0");
  });
});