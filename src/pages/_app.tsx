import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Header from "@/components/Header";
import Cart from "@/components/Cart";
import LoginModal from "@/components/LoginModal";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

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
      <WishlistProvider>
        <Header
          onCartOpen={() => setIsCartOpen(true)}
          onLoginOpen={() => setIsLoginOpen(true)}
          onLogout={handleLogout}
          isLoggedIn={isLoggedIn}
        />
        <Component {...pageProps} />
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} onSuccess={handleLoginSuccess} />}
        
        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={1000} // Closes after 2 seconds
          hideProgressBar
          closeOnClick
          pauseOnHover
          draggable
          theme="light" // You can change this to "dark" or "colored"
        />
      </WishlistProvider>
    </CartProvider>
  );
}