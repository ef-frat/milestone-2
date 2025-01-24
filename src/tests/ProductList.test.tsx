import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductList from "@/components/ProductList";
import { useCart } from "@/context/CartContext";

// Mock the useCart hook
jest.mock("@/context/CartContext", () => ({
  useCart: jest.fn(),
}));

describe("ProductList Component", () => {
  const mockAddToCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock the addToCart function in the useCart hook
    (useCart as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
    });
  });

  const mockProducts = [
    {
      id: 1,
      title: "Product 1",
      price: 10.99,
      images: ["https://via.placeholder.com/150"],
    },
    {
      id: 2,
      title: "Product 2",
      price: 20.99,
      images: ["https://via.placeholder.com/150"],
    },
  ];

  it("renders a list of products", () => {
    render(<ProductList products={mockProducts} />);

    expect(screen.getByText("Our Products:")).toBeInTheDocument();
    mockProducts.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument();
    });
  });

  it("calls addToCart when the Add to Cart button is clicked", () => {
    render(<ProductList products={mockProducts} />);

    const addToCartButtons = screen.getAllByRole("button", { name: /add to cart/i });

    // Simulate clicking the Add to Cart button for the first product
    fireEvent.click(addToCartButtons[0]);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith({
      id: mockProducts[0].id,
      title: mockProducts[0].title,
      price: mockProducts[0].price,
      image: mockProducts[0].images[0],
      quantity: 1,
    });
  });

  it("renders a placeholder image when the product image fails to load", () => {
    render(<ProductList products={mockProducts} />);

    const images = screen.getAllByRole("img");
    fireEvent.error(images[0]); // Simulate image load error

    expect(images[0]).toHaveAttribute("src", "https://via.placeholder.com/150");
  });
});