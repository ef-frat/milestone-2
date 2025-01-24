import { useCart } from "@/context/CartContext";

interface HeaderProps {
  onCartOpen: () => void; // Function to open the cart
  onLoginOpen: () => void; // Function to open the login modal
  onLogout: () => void; // Function to handle logout
  isLoggedIn: boolean; // Boolean to check if the user is logged in
}

export default function Header({ onCartOpen, onLoginOpen, onLogout, isLoggedIn }: HeaderProps) {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1>SHOP SMART</h1>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={onCartOpen} style={{ position: "relative", fontSize: "1.2rem", cursor: "pointer" }}>
          🛒
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "0px",
                right: "-10px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                padding: "0.2rem 0.5rem",
                fontSize: "0.8rem",
              }}
            >
              {cartCount}
            </span>
          )}
        </button>

        {!isLoggedIn ? (
          <button onClick={onLoginOpen} style={{ cursor: "pointer" }}>
            Login
          </button>
        ) : (
          <button
            onClick={onLogout}
            style={{
              cursor: "pointer",
              backgroundColor: "#ff4d4d",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}