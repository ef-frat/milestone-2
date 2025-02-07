import React, { useState } from "react";
import Modal from "react-modal";

// List of Prozes
const prizes = [
  { label: "🎉  10% Off Discount  🎉", discount: 10 },
  { label: "🚚  Free Shipping  🚚", freeShipping: true },
  { label: "🔥  15% Off Discount  🔥", discount: 15 },
  { label: "🛍️  Buy 1 Get 1 Free  🛍️", bogo: true },
  { label: "💰  5% Cashback  💰", discount: 5 },
  { label: "🎁  Mystery Gift  🎁", mysteryGift: true },
];

const SpinWheel: React.FC<{ isOpen: boolean; onClose: () => void; onPrizeWin: (prize: any) => void }> = ({
  isOpen,
  onClose,
  onPrizeWin,
}) => {
  const [spinning, setSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<string | null>(null);

  const handleSpin = () => {
    if (!spinning) {
      setSpinning(true);

      setTimeout(() => {
        const prize = prizes[Math.floor(Math.random() * prizes.length)];
        setSelectedPrize(prize.label);
        onPrizeWin(prize); // ✅ Send prize to _app.tsx
        setSpinning(false);
      }, 3000);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        content: { width: "350px", height: "350px", margin: "auto", padding: "3rem", textAlign: "center" },
      }}
    >

      {/* "X" Button (Top Right) */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          fontSize: "1.5rem",
          cursor: "pointer",
          color: "#777",
          transition: "color 0.2s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#222")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#777")}
      >
        ✖
      </button>

      <h2>🎡 Spin the Wheel! 🎡</h2>
      <p>Want a special reward for your purchase?</p>

      {/* Wheel Image */}
      <div
        style={{
          width: "200px",
          height: "200px",
          margin: "20px auto",
          borderRadius: "50%",
          backgroundColor: "#f8b400",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#fff",
          cursor: spinning ? "not-allowed" : "pointer",
          transition: "transform 3s ease-in-out",
          transform: spinning ? "rotate(360deg)" : "rotate(0deg)",
        }}
        onClick={handleSpin}
      >
        {spinning ? "Spinning..." : "🎯 Click Here!"}
      </div>

      {/* Display Prize */}
      {selectedPrize && <p style={{ fontSize: "1 rem", fontWeight: "bold" }}>🎉🎉 You won: {selectedPrize}!</p>}

    </Modal>
  );
};

export default SpinWheel;