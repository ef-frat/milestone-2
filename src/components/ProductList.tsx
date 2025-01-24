import React from "react";
import { useCart } from "@/context/CartContext";

// Define the Product type
interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

// Define props for ProductList
interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { addToCart } = useCart();

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Our Products:</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "1rem",
              borderRadius: "8px",
              backgroundColor: "#fff",
              textAlign: "center",
            }}
          >
            <img
              src={product.images[0] || "https://via.placeholder.com/150"}
              alt={product.title}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
              onError={(e) => {
                if (e.currentTarget.src !== "https://via.placeholder.com/150") {
                  e.currentTarget.src = "https://via.placeholder.com/150";
                }
              }}
            />
            <h3 style={{ margin: "0.5rem 0" }}>{product.title}</h3>
            <p style={{ fontWeight: "bold" }}>${product.price.toFixed(2)}</p>
            <button
              style={{
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
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
        ))}
      </div>
    </div>
  );
};

export default ProductList;