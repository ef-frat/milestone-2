import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductList from "../components/ProductList";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useRouter } from "next/router";

// ✅ Mock Next.js Link to behave like a normal anchor tag
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="product-link">
      {children}
    </a>
  ),
}));

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Mock useCart
jest.mock("@/context/CartContext", () => ({
  useCart: jest.fn(),
}));

// Mock useWishlist
jest.mock("@/context/WishlistContext", () => ({
  useWishlist: jest.fn(),
}));

const mockPush = jest.fn();
const mockAddToCart = jest.fn();
const mockAddToWishlist = jest.fn();
const mockRemoveFromWishlist = jest.fn();
const mockIsInWishlist = jest.fn();

// Define Product type explicitly
interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

// Sample product data
const mockProducts: Product[] = [
  { id: 1, title: "Product 1", price: 29.99, images: ["image1.jpg"] },
  { id: 2, title: "Product 2", price: 49.99, images: ["image2.jpg"] },
];

// Helper function to render ProductList
const renderProductList = () => {
  return render(<ProductList products={mockProducts} />);
};

describe("ProductList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock useRouter
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    // Mock useCart
    (useCart as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
    });

    // Mock useWishlist
    (useWishlist as jest.Mock).mockReturnValue({
      addToWishlist: mockAddToWishlist,
      removeFromWishlist: mockRemoveFromWishlist,
      isInWishlist: mockIsInWishlist,
    });
  });

  it("should render product list", () => {
    renderProductList();

    expect(screen.getByText("Our Products")).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("should navigate to product details when product is clicked", () => {
    renderProductList();

    const productLink = screen.getAllByTestId("product-link")[0]; // ✅ Mocked as a regular `<a>`
    fireEvent.click(productLink);

    expect(mockPush).toHaveBeenCalledWith("/product/1");
  });

  it("should add product to cart when clicking 'Add to Cart'", () => {
    renderProductList();

    fireEvent.click(screen.getAllByText("Add to Cart")[0]);

    expect(mockAddToCart).toHaveBeenCalledWith({
      id: 1,
      title: "Product 1",
      price: 29.99,
      image: "image1.jpg",
      quantity: 1,
    });
  });
});