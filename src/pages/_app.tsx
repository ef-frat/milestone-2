import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import LoginModal from "@/components/LoginModal";
import SpinWheel from "@/components/SpinWheel";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSpinOpen, setIsSpinOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Open Spin Wheel on first load
  useEffect(() => {
    setIsSpinOpen(true);
  }, []);

  // ✅ Close Spin Wheel
  const handleSpinClose = () => {
    setIsSpinOpen(false);
  };

  // ✅ Handle when a prize is won
  const handlePrizeWin = (prize: any) => {
    localStorage.setItem("spinPrize", JSON.stringify(prize));
    toast.success(`🎉 You won: ${prize.label}!`);
    setIsSpinOpen(false); // Close spin wheel after winning
  };

  // ✅ Handle Login/Logout
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
          onShopSmartClick={() => setIsSpinOpen(true)}
        />

        {/* ✅ Main Content */}
        <main style={{ minHeight: "80vh" }}>
          <Component {...pageProps} />
        </main>

        {/* ✅ Footer */}
        <Footer />

        {/* ✅ Cart & Login Modal */}
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} onSuccess={handleLoginSuccess} />}

        {/* ✅ Spin the Wheel Pop-up */}
        <SpinWheel isOpen={isSpinOpen} onClose={handleSpinClose} onPrizeWin={handlePrizeWin} />

        {/* ✅ Toast Notifications */}
        <ToastContainer position="top-right" autoClose={800} hideProgressBar closeOnClick pauseOnHover draggable />
      </WishlistProvider>
    </CartProvider>
  );
}