import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const [discount, setDiscount] = useState<number>(0);
  const [freeShipping, setFreeShipping] = useState<boolean>(false);
  const [mysteryGift, setMysteryGift] = useState<boolean>(false);
  const [prizeLabel, setPrizeLabel] = useState<string | null>(null);
  const [isCheckoutComplete, setIsCheckoutComplete] = useState<boolean>(false);

  useEffect(() => {
    // ✅ Check if a spin prize was applied
    const storedPrize = localStorage.getItem("spinPrize");
    if (storedPrize) {
      const parsedPrize = JSON.parse(storedPrize);

      // ✅ Apply the relevant prize
      if (parsedPrize.discount) {
        setDiscount(parsedPrize.discount);
      }
      if (parsedPrize.freeShipping) {
        setFreeShipping(true);
      }
      if (parsedPrize.mysteryGift) {
        setMysteryGift(true);
      }
      setPrizeLabel(parsedPrize.label);
    }
  }, []);

  // ✅ Calculate total before discount
  const totalBeforeDiscount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // ✅ Apply discount
  const totalAfterDiscount = totalBeforeDiscount * ((100 - discount) / 100);

  // ✅ Handle checkout completion
  const handleCheckout = () => {
    setIsCheckoutComplete(true); // ✅ Show confirmation message
    localStorage.removeItem("spinPrize"); // ✅ Remove spin prize after checkout
    setTimeout(() => {
      clearCart(); // ✅ Clear cart after purchase completion
      router.push("/thank-you"); // ✅ Navigate to the thank-you page
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🛒 Checkout</h1>

      {/* Show Discount Applied */}
      {prizeLabel && <p style={styles.prizeMessage}>🎉 Your Reward: {prizeLabel}!</p>}

      {/* Cart Summary */}
      <p>Subtotal: ${totalBeforeDiscount.toFixed(2)}</p>
      {discount > 0 && <p>Discount: -{discount}%</p>}
      {freeShipping && <p>🚚 Free Shipping Applied</p>}
      {mysteryGift && <p>🎁 Mystery Gift Included</p>}
      <h3>Total: ${totalAfterDiscount.toFixed(2)}</h3>

      {/* Checkout Button */}
      {!isCheckoutComplete ? (
        <button style={styles.button} onClick={handleCheckout}>
          Complete Purchase
        </button>
      ) : (
        <p style={styles.successMessage}>✅ Order Completed! Redirecting...</p>
      )}

      {/* Back to Shop Button */}
      <button style={styles.backButton} onClick={() => router.push("/")}>
        Continue Shopping
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center" as "center",
    padding: "2rem",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  prizeMessage: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#d6336c",
    marginBottom: "1rem",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "1rem",
  },
  backButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "1rem",
    marginLeft: "1rem",
  },
  successMessage: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#28a745",
    marginTop: "1rem",
  },
};

export default CheckoutPage;