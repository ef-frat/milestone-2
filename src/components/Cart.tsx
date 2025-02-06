import React from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/router";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const router = useRouter();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose(); // ✅ Close the cart, but KEEP items in the cart
    router.push("/checkout"); // ✅ Navigate to checkout page
  };

  return (
    <>
      {/* Overlay */}
      <div
        data-testid="cart-overlay"
        style={{ ...styles.overlay, display: isOpen ? "block" : "none" }}
        onClick={onClose}
      />
      {/* Cart Panel */}
      <div style={{ ...styles.cartPanel, transform: isOpen ? "translateX(0)" : "translateX(100%)" }}>
        <div style={styles.cartHeader}>
          <h2 style={styles.cartTitle}>Shopping Cart</h2>
          <button data-testid="close-button" style={styles.closeButton} onClick={onClose}>
            ✖
          </button>
        </div>
        <div style={styles.cartBody}>
          {cartItems.length === 0 ? (
            <p style={styles.emptyMessage}>Your cart is empty.</p>
          ) : (
            <>
              <div style={styles.cartItems}>
                {cartItems.map((item) => (
                  <div key={item.id} style={styles.cartItem}>
                    <img src={item.image} alt={item.title} style={styles.productImage} />
                    <div style={styles.productInfo}>
                      <h4 style={styles.productTitle}>{item.title}</h4>
                      <p style={styles.productPrice}>${item.price.toFixed(2)}</p>

                      {/* Quantity Controls */}
                      <div style={styles.quantityControls}>
                        <button
                          style={styles.quantityButton}
                          onClick={() => decreaseQuantity(item.id)}
                          disabled={item.quantity === 1}
                        >
                          ➖
                        </button>
                        <span style={styles.quantity}>{item.quantity}</span>
                        <button style={styles.quantityButton} onClick={() => increaseQuantity(item.id)}>
                          ➕
                        </button>
                      </div>
                    </div>

                    <button style={styles.removeButton} onClick={() => removeFromCart(item.id)}>
                      ✖
                    </button>
                  </div>
                ))}
              </div>
              <div style={styles.totalContainer}>
                <h3 style={styles.totalText}>Total: ${total.toFixed(2)}</h3>
                <button style={styles.clearCartButton} onClick={() => clearCart(false)}>
                  Clear Cart
                </button>
                <button style={styles.checkoutButton} onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;

const styles = {
  overlay: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  cartPanel: {
    position: "fixed" as "fixed",
    top: 0,
    right: 0,
    width: "380px",
    height: "100%",
    backgroundColor: "#fff",
    boxShadow: "-4px 0 12px rgba(0, 0, 0, 0.1)",
    padding: "1.5rem",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column" as "column",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease-in-out",
    fontFamily: "'Inter', sans-serif",
  },
  cartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #eee",
    paddingBottom: "1rem",
  },
  cartTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#222",
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#555",
    transition: "color 0.2s ease-in-out",
    padding: "0.5rem",
  },
  cartBody: {
    flex: 1,
    overflowY: "auto" as "auto",
    padding: "1rem 0",
  },
  emptyMessage: {
    textAlign: "center" as "center",
    color: "#777",
    fontSize: "1rem",
  },
  cartItems: {
    paddingBottom: "1rem",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem",
    padding: "0.75rem",
    borderRadius: "8px",
    backgroundColor: "#f8f8f8",
  },
  productImage: {
    width: "70px",
    height: "70px",
    borderRadius: "6px",
    objectFit: "cover" as "cover",
  },
  productInfo: {
    flex: 1,
    marginLeft: "1rem",
  },
  productTitle: {
    margin: "0 0 0.3rem",
    fontSize: "1rem",
    fontWeight: "500",
    color: "#222",
  },
  productPrice: {
    margin: "0.3rem 0",
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#444",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },
  quantityButton: {
    backgroundColor: "#ddd",
    border: "none",
    padding: "0.4rem 0.8rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  quantity: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "1.2rem",
    cursor: "pointer",
    color: "#777",
    transition: "color 0.2s ease-in-out",
    padding: "0.3rem",
  },
  totalContainer: {
    paddingTop: "1rem",
    borderTop: "1px solid #ddd",
    textAlign: "center" as "center",
  },
  totalText: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#222",
  },
  clearCartButton: {
    backgroundColor: "#bbb",
    color: "#fff",
    border: "none",
    padding: "0.8rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    width: "100%",
    marginBottom: "0.75rem",
    transition: "opacity 0.2s ease-in-out",
  },
  checkoutButton: {
    backgroundColor: "#222",
    color: "#fff",
    border: "none",
    padding: "0.8rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    width: "100%",
    transition: "opacity 0.2s ease-in-out",
  },
};