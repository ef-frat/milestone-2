import React from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ marginBottom: "1.5rem", fontSize: "1.5rem", fontWeight: "600", color: "#222" }}>
        Our Products
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
              overflow: "hidden",
              transition: "transform 0.2s ease-in-out",
              position: "relative", // Needed for the wishlist button
            }}
          >
            <Link href={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div>
                <img
                  src={product.images[0] || "https://via.placeholder.com/250"}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    backgroundColor: "#f8f8f8",
                  }}
                  onError={(e) => {
                    if (e.currentTarget.src !== "https://via.placeholder.com/250") {
                      e.currentTarget.src = "https://via.placeholder.com/250";
                    }
                  }}
                />
                <div style={{ padding: "1rem" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "500", marginBottom: "0.5rem", color: "#222" }}>
                    {product.title}
                  </h3>
                </div>
              </div>
            </Link>

            {/* Wishlist Button */}
            <button
              onClick={() =>
                isInWishlist(product.id)
                  ? removeFromWishlist(product.id)
                  : addToWishlist({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.images[0],
                    })
              }
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                transition: "opacity 0.2s ease-in-out",
              }}
            >
              {isInWishlist(product.id) ? "❤️" : "🤍"}
            </button>

            {/* Price & Add to Cart Section */}
            <div style={{ padding: "1rem", borderTop: "1px solid #eee", textAlign: "center" }}>
              <p style={{ fontSize: "1rem", fontWeight: "600", color: "#444", marginBottom: "0.75rem" }}>
                ${product.price.toFixed(2)}
              </p>
              <button
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  backgroundColor: "#222",
                  color: "#fff",
                  fontSize: "1rem",
                  border: "none",
                  cursor: "pointer",
                  transition: "opacity 0.2s ease-in-out",
                }}
                onClick={() =>
                  addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.images[0],
                    quantity: 1,
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;