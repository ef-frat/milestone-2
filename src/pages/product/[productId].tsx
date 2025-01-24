// STILL ON PROGRESS FOR THIS PART //

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

  if (error || !product) return <div>{error || "Product not found"}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <img
          src={product.images[0]}
          alt={product.title}
          style={styles.image}
        />
      </div>
      <div style={styles.detailsContainer}>
        <h2>{product.title}</h2>
        <p style={styles.price}>Price: ${product.price.toFixed(2)}</p>
        <p style={styles.category}>Category: {product.category.name}</p>
        <p style={styles.description}>{product.description}</p>
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
    gap: "2rem",
    padding: "2rem",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "400px",
    objectFit: "cover" as "cover",
    borderRadius: "8px",
  },
  detailsContainer: {
    flex: 2,
    display: "flex",
    flexDirection: "column" as "column",
    gap: "1rem",
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: "bold" as "bold",
  },
  category: {
    fontStyle: "italic" as "italic",
    color: "#555",
  },
  description: {
    marginTop: "1rem",
    lineHeight: "1.5",
  },
  addToCartButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "1rem",
  },
};