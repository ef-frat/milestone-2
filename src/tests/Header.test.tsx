import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../components/Header";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { useRouter } from "next/router";

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockPush });

// Mock functions
const mockOnCartOpen = jest.fn();
const mockOnLoginOpen = jest.fn();
const mockOnLogout = jest.fn();
const mockOnShopSmartClick = jest.fn();

// Define types for test items
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface WishlistItem {
  id: number;
  title: string;
}

// Helper function to render Header inside providers
const renderHeader = (
  isLoggedIn = false,
  cartItems: CartItem[] = [],
  wishlist: WishlistItem[] = []
) => {
  return render(
    <CartProvider>
      <WishlistProvider>
        <Header
          isLoggedIn={isLoggedIn}
          onCartOpen={mockOnCartOpen}
          onLoginOpen={mockOnLoginOpen}
          onLogout={mockOnLogout}
          onShopSmartClick={mockOnShopSmartClick}
        />
      </WishlistProvider>
    </CartProvider>
  );
};

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the header", () => {
    renderHeader();

    expect(screen.getByText("SHOP SMART")).toBeInTheDocument();
  });

  it("should call onShopSmartClick and navigate home when SHOP SMART is clicked", () => {
    renderHeader();

    fireEvent.click(screen.getByText("SHOP SMART"));

    expect(mockOnShopSmartClick).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("should call onCartOpen when cart button is clicked", () => {
    renderHeader();

    fireEvent.click(screen.getByText("🛒"));

    expect(mockOnCartOpen).toHaveBeenCalled();
  });

  it("should display cart count when items are present", () => {
    renderHeader(false, [{ id: 1, title: "Item 1", price: 50, quantity: 2 }]); // 2 items

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should navigate to wishlist when wishlist button is clicked", () => {
    renderHeader();

    fireEvent.click(screen.getByRole("button", { name: /wishlist/i }));

    expect(mockPush).toHaveBeenCalledWith("/wishlist");
  });

  it("should show filled wishlist icon when wishlist has items", () => {
    renderHeader(false, [], [{ id: 1, title: "Wishlist Item" }]); // Wishlist has items

    const wishlistIcon = screen.getByRole("button", { name: /wishlist/i }).querySelector("svg");
    expect(wishlistIcon).toHaveAttribute("fill", "#d6336c"); // Filled heart
  });

  it("should call onLoginOpen when Login button is clicked (if not logged in)", () => {
    renderHeader(false); // Not logged in

    fireEvent.click(screen.getByText("Login"));

    expect(mockOnLoginOpen).toHaveBeenCalled();
  });

  it("should call onLogout when Logout button is clicked (if logged in)", () => {
    renderHeader(true); // Logged in

    fireEvent.click(screen.getByText("Logout"));

    expect(mockOnLogout).toHaveBeenCalled();
  });
});