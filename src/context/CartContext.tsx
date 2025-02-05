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
  clearCart: () => void;
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

  // ✅ Fully Fix Double Toast Issue
  const addToCart = (product: CartItem) => {
    // ✅ Find if the product is already in the cart BEFORE state updates
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // ✅ Show toast message only ONCE before updating state
      toast.info(`Updated quantity: ${existingItem.quantity + 1} 🛒`);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // ✅ Show toast message only ONCE before updating state
      toast.success("Item added to cart 🛍️");
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
  };

  // ✅ Remove an item from the cart with a toast message
  const removeFromCart = (productId: number) => {
    const itemToRemove = cartItems.find((item) => item.id === productId);
    if (itemToRemove) {
      toast.warn(`Removed ${itemToRemove.title} from cart ❌`);
    }
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // ✅ Increase quantity of a cart item
  const increaseQuantity = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    toast.info("Quantity increased ➕");
  };

  // ✅ Decrease quantity of a cart item (ensuring minimum quantity is 1)
  const decreaseQuantity = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
    toast.info("Quantity decreased ➖");
  };

  // ✅ Clear all items in the cart with a toast message
  const clearCart = () => {
    if (cartItems.length > 0) {
      toast.warn("Your cart has been emptied 🗑️");
    }
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};