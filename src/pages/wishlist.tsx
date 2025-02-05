import React from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, cartItems } = useCart();

  const isInCart = (id: number) => cartItems.some((item) => item.id === id);

  const handleAddAllToCart = () => {
    wishlist.forEach((item) => {
      if (!isInCart(item.id)) {
        addToCart({ id: item.id, title: item.title, price: item.price, image: item.image, quantity: 1 });
      }
    });
  };

  const handleClearWishlist = () => {
    if (confirm("Are you sure you want to remove all items from your wishlist?")) {
      clearWishlist();
    }
  };

  return (
    <div style={{ padding: "3rem", maxWidth: "1200px", margin: "auto" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: "600", color: "#222", marginBottom: "2rem", textAlign: "center" }}>
        Your Wishlist
      </h2>

      {/* Buttons Section (Show Only When Wishlist Has Items) */}
      {wishlist.length > 0 && (
        <div style={{ textAlign: "center", marginBottom: "1.5rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
          <button
            onClick={handleAddAllToCart}
            style={{
              backgroundColor: "#222",
              color: "#fff",
              border: "none",
              padding: "0.8rem 1.5rem",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "opacity 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Add All to Cart 🛒
          </button>

          {/* ✅ Remove All Button */}
          <button
            onClick={handleClearWishlist}
            style={{
              backgroundColor: "#ff4d4d",
              color: "#fff",
              border: "none",
              padding: "0.8rem 1.5rem",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "opacity 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Remove All ❌
          </button>
        </div>
      )}

      {wishlist.length === 0 ? (
        <p style={{ fontSize: "1.2rem", color: "#666", textAlign: "center" }}>Your wishlist is empty.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {wishlist.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                overflow: "hidden",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Link href={`/product/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img
                  src={item.image || "https://via.placeholder.com/280"}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                    backgroundColor: "#f8f8f8",
                  }}
                  onError={(e) => {
                    if (e.currentTarget.src !== "https://via.placeholder.com/280") {
                      e.currentTarget.src = "https://via.placeholder.com/280";
                    }
                  }}
                />
              </Link>

              <div style={{ padding: "1.2rem", textAlign: "center" }}>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "500", color: "#222" }}>{item.title}</h3>
                <p style={{ fontSize: "1rem", fontWeight: "600", color: "#444", margin: "0.7rem 0" }}>
                  ${item.price.toFixed(2)}
                </p>

                {/* Add to Cart & Remove Buttons */}
                <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1rem" }}>
                  <button
                    onClick={() =>
                      !isInCart(item.id) &&
                      addToCart({ id: item.id, title: item.title, price: item.price, image: item.image, quantity: 1 })
                    }
                    disabled={isInCart(item.id)}
                    style={{
                      backgroundColor: isInCart(item.id) ? "#ccc" : "#222",
                      color: "#fff",
                      border: "none",
                      padding: "0.7rem 1rem",
                      borderRadius: "8px",
                      fontSize: "0.9rem",
                      cursor: isInCart(item.id) ? "not-allowed" : "pointer",
                      transition: "opacity 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                      if (!isInCart(item.id)) e.currentTarget.style.opacity = "0.8";
                    }}
                    onMouseLeave={(e) => {
                      if (!isInCart(item.id)) e.currentTarget.style.opacity = "1";
                    }}
                  >
                    {isInCart(item.id) ? "In Cart ✅" : "Add to Cart"}
                  </button>

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    style={{
                      backgroundColor: "#ff4d4d",
                      color: "#fff",
                      border: "none",
                      padding: "0.7rem 1rem",
                      borderRadius: "8px",
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      transition: "opacity 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;