import React from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/router";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    clearCart();
    onClose();
    router.push("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      <div
        data-testid="cart-overlay"
        style={{
          ...styles.overlay,
          display: isOpen ? "block" : "none",
        }}
        onClick={onClose}
      />
      {/* Cart Panel */}
      <div
        style={{
          ...styles.cartPanel,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div style={styles.cartHeader}>
          <h2>🛒 Shopping Cart</h2>
          <button data-testid="close-button" style={styles.closeButton} onClick={onClose}>
            ❌
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
                    <img
                      src={item.image}
                      alt={item.title}
                      style={styles.productImage}
                    />
                    <div style={styles.productInfo}>
                      <h4 style={styles.productTitle}>{item.title}</h4>
                      <p style={styles.productPrice}>
                        Price: ${item.price.toFixed(2)}
                      </p>
                      <p style={styles.quantity}>Quantity: {item.quantity}</p>
                    </div>
                    <button
                      data-testid={`remove-button-${item.id}`}
                      style={styles.removeButton}
                      onClick={() => removeFromCart(item.id)}
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
              <div style={styles.totalContainer}>
                <h3>Total: ${total.toFixed(2)}</h3>
                <button data-testid="clear-cart-button" style={styles.clearCartButton} onClick={clearCart}>
                  🗑️ Clear Cart
                </button>
                <button data-testid="checkout-button" style={styles.checkoutButton} onClick={handleCheckout}>
                  💳 Checkout
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
    width: "400px",
    height: "100%",
    backgroundColor: "#fff",
    boxShadow: "-4px 0 8px rgba(0, 0, 0, 0.1)",
    padding: "1rem",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column" as "column",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease-in-out",
  },
  cartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  cartBody: {
    flex: 1,
    overflowY: "auto" as "auto",
    padding: "1rem 0",
  },
  emptyMessage: {
    textAlign: "center" as "center",
    color: "#555",
  },
  cartItems: {
    paddingBottom: "1rem",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem",
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  productImage: {
    width: "80px",
    height: "80px",
    borderRadius: "8px",
    objectFit: "cover" as "cover",
  },
  productInfo: {
    flex: 1,
    marginLeft: "1rem",
  },
  productTitle: {
    margin: "0 0 0.5rem",
    fontSize: "1.1rem",
    fontWeight: "bold" as "bold",
  },
  productPrice: {
    margin: "0.5rem 0",
    color: "#666",
  },
  quantity: {
    margin: "0.2rem 0",
    fontStyle: "italic" as "italic",
    color: "#777",
  },
  removeButton: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  totalContainer: {
    paddingTop: "1rem",
    borderTop: "1px solid #ddd",
  },
  clearCartButton: {
    backgroundColor: "#ff6f61",
    color: "#fff",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "1rem",
    width: "100%",
  },
  checkoutButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
  },
};