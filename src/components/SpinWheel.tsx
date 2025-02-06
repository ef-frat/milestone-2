import React, { useState } from "react";
import Modal from "react-modal";

const prizes = [
  { label: "10% Off Discount 🎉", discount: 10 },
  { label: "Free Shipping 🚚", freeShipping: true },
  { label: "15% Off Discount 🔥", discount: 15 },
  { label: "Buy 1 Get 1 Free 🛍️", bogo: true },
  { label: "5% Cashback 💰", discount: 5 },
  { label: "Mystery Gift 🎁", mysteryGift: true },
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
        content: { width: "400px", height: "450px", margin: "auto", padding: "2rem", textAlign: "center" },
      }}
    >
      <h2>🎡 Spin the Wheel! 🎡</h2>
      <p>Spin and get a special reward for your purchase!</p>

      {/* Wheel Image */}
      <div
        style={{
          width: "150px",
          height: "150px",
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
        {spinning ? "🎰 Spinning..." : "🎯 Spin Now!"}
      </div>

      {/* Display Prize */}
      {selectedPrize && <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>🎉 You won: {selectedPrize}!</p>}

      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          marginTop: "1rem",
          padding: "0.7rem 1.2rem",
          borderRadius: "8px",
          backgroundColor: "#ff4d4d",
          color: "#fff",
          fontSize: "1rem",
          border: "none",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </Modal>
  );
};

export default SpinWheel;