import { GetServerSideProps } from "next";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
  };
}

interface ProductDetailPageProps {
  product: Product | null;
  error: string | null;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, error }) => {
  const { addToCart } = useCart();

  if (error || !product)
    return <div style={styles.errorMessage}>{error || "Product not found"}</div>;

  return (
    <div style={styles.container}>
      {/* Product Image */}
      <div style={styles.imageContainer}>
        <img src={product.images[0]} alt={product.title} style={styles.image} />
      </div>

      {/* Product Details */}
      <div style={styles.detailsContainer}>
        <h2 style={styles.title}>{product.title}</h2>
        <p style={styles.price}>${product.price.toFixed(2)}</p>
        <p style={styles.category}>{product.category.name}</p>
        <p style={styles.description}>{product.description}</p>

        {/* Add to Cart Button */}
        <button
          style={styles.addToCartButton}
          onClick={() =>
            addToCart({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.images[0],
              quantity: 1,
            })
          }
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productId } = context.params as { productId: string };

  try {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product details.");
    }
    const product: Product = await response.json();

    return {
      props: {
        product,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        product: null,
        error: "Failed to load product details. Please try again.",
      },
    };
  }
};

export default ProductDetailPage;

const styles = {
  container: {
    display: "flex",
    gap: "3rem",
    padding: "3rem",
    maxWidth: "1100px",
    margin: "auto",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    maxWidth: "500px",
    height: "auto",
    objectFit: "cover" as "cover",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
  },
  detailsContainer: {
    flex: 2,
    display: "flex",
    flexDirection: "column" as "column",
    gap: "1rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "600",
    color: "#222",
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: "bold" as "bold",
    color: "#444",
  },
  category: {
    fontSize: "1rem",
    fontWeight: "500",
    fontStyle: "italic" as "italic",
    color: "#666",
  },
  description: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "#444",
  },
  addToCartButton: {
    backgroundColor: "#222",
    color: "#fff",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    width: "100%",
    transition: "opacity 0.2s ease-in-out",
  },
  errorMessage: {
    textAlign: "center" as "center",
    fontSize: "1.2rem",
    color: "#666",
    marginTop: "2rem",
  },
};