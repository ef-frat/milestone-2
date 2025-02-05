import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext"; // Updated import
import Header from "@/components/Header";
import Cart from "@/components/Cart";
import LoginModal from "@/components/LoginModal";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <CartProvider>
      <WishlistProvider> {/* Wrap inside WishlistProvider */}
        <Header
          onCartOpen={() => setIsCartOpen(true)}
          onLoginOpen={() => setIsLoginOpen(true)}
          onLogout={handleLogout}
          isLoggedIn={isLoggedIn}
        />
        <Component {...pageProps} />
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} onSuccess={handleLoginSuccess} />}
      </WishlistProvider>
    </CartProvider>
  );
}