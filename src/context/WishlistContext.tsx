import { createContext, useContext, useState, ReactNode } from "react";

interface WishlistItem {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;
  isInWishlist: (id: number) => boolean; // ✅ Add isInWishlist function type
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Add item to wishlist
  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      if (!prev.some((wishlistItem) => wishlistItem.id === item.id)) {
        return [...prev, item];
      }
      return prev;
    });
  };

  // Remove a single item from wishlist
  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

   // Function to clear all items from the wishlist
   const clearWishlist = () => {
    setWishlist([]); // Update state to empty array
  };

  // Function to check if an item is in the wishlist
  const isInWishlist = (id: number) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};