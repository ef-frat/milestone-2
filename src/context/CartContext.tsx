import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-toastify";

// Define the structure of a cart item
interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

// Define the context's value type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: (silent?: boolean) => void; // Added optional "silent" mode
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// CartProvider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add item to cart
  const addToCart = (product: CartItem) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      toast.info(`Updated quantity: ${existingItem.quantity + 1} 🛒`);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      toast.success("Item added to cart.");
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (productId: number) => {
    const itemToRemove = cartItems.find((item) => item.id === productId);
    if (itemToRemove) {
      toast.warn(`❌ Removed ${itemToRemove.title} from cart.`);
    }
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Increase quantity
  const increaseQuantity = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    toast.info("➕ Quantity increased.");
  };

  // Decrease quantity (minimum of 1)
  const decreaseQuantity = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
    toast.info("➖ Quantity decreased.");
  };

  // Separate Clear Cart function for Button and Checkout
  const clearCart = (silent = false) => {
    if (silent) {
      // Silent mode (Used for checkout, No Toast)
      setCartItems([]);
      return;
    }

    // Normal "Clear Cart" button (Shows Confirmation Toast)
    if (cartItems.length === 0) {
      toast.info("Your cart is already empty.");
      return;
    }

    const toastId = toast.warn(
      <div>
        <p style={{ marginBottom: "0.5rem", fontWeight: "600" }}>Are you sure you want to empty the cart?</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button
            onClick={() => {
              setCartItems([]); // Clear the cart
              toast.dismiss(toastId);
              toast.success("🗑️ Cart has been emptied.");
            }}
            style={{
              background: "#222",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Yes, Clear
          </button>

          <button
            onClick={() => toast.dismiss(toastId)} // Dismiss the toast without clearing
            style={{
              background: "#5bc0de",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            No, Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        position: "top-right",
      }
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};