import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext"; 

interface HeaderProps {
  onCartOpen: () => void;
  onLoginOpen: () => void;
  onLogout: () => void;
  isLoggedIn: boolean;
}

export default function Header({ onCartOpen, onLoginOpen, onLogout, isLoggedIn }: HeaderProps) {
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const hasWishlistItems = wishlist.length > 0;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#fff",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Brand Logo */}
      <Link href="/" style={{ textDecoration: "none", color: "#222" }}>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            letterSpacing: "1px",
            cursor: "pointer",
            transition: "opacity 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          SHOP SMART
        </h1>
      </Link>

      {/* Header Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        {/* Cart Button */}
        <button
          onClick={onCartOpen}
          style={{
            position: "relative",
            fontSize: "2rem", // Increased from 1.5rem to 2rem
            cursor: "pointer",
            border: "none",
            background: "none",
            padding: "0.2rem",
          }}
        >
          🛒
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-3px", // Adjusted for better alignment
                right: "-12px",
                backgroundColor: "#333",
                color: "white",
                borderRadius: "50%",
                padding: "5px 9px",
                fontSize: "0.8rem",
                fontWeight: "600",
                minWidth: "22px",
                textAlign: "center",
                lineHeight: "1",
              }}
            >
              {cartCount}
            </span>
          )}
        </button>

        {/* Wishlist Button */}
        <Link href="/wishlist" style={{ display: "flex", alignItems: "center" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill={hasWishlistItems ? "#d6336c" : "none"}
            stroke={hasWishlistItems ? "#d6336c" : "#222"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transition: "stroke 0.2s ease-in-out, fill 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.stroke = "#d6336c")}
            onMouseLeave={(e) => (e.currentTarget.style.stroke = hasWishlistItems ? "#d6336c" : "#222")}
          >
            <path d="M20.8 4.6a5.4 5.4 0 00-7.7 0L12 5.7l-1.1-1.1a5.4 5.4 0 00-7.7 7.7L12 21l8.8-8.8a5.4 5.4 0 000-7.7z"></path>
          </svg>
        </Link>

        {/* Login / Logout Button */}
        {!isLoggedIn ? (
          <button
            onClick={onLoginOpen}
            style={{
              cursor: "pointer",
              backgroundColor: "#222",
              color: "#fff",
              border: "none",
              padding: "0.6rem 1.2rem",
              borderRadius: "6px",
              fontSize: "0.9rem",
              transition: "opacity 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Login
          </button>
        ) : (
          <button
            onClick={onLogout}
            style={{
              cursor: "pointer",
              backgroundColor: "#444",
              color: "#fff",
              border: "none",
              padding: "0.6rem 1.2rem",
              borderRadius: "6px",
              fontSize: "0.9rem",
              transition: "opacity 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}