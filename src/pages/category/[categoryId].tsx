// STILL ON PROGRESS FOR THIS PART //

import axios from "axios";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

interface Props {
  categoryId: string;
  products: Product[];
}

export default function ProductCategoryPage({ categoryId, products }: Props) {
  const { addToCart } = useCart();

  return (
    <div>
      <h2>Products in Category: {categoryId}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ddd", padding: "1rem" }}>
            <img
              src={product.images[0]}
              alt={product.title}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h3>{product.title}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button
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
}

export async function getServerSideProps(context: any) {
  const { categoryId } = context.params;

  try {
    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`
    );
    return {
      props: {
        categoryId,
        products: response.data,
      },
    };
  } catch (error) {
    return {
      props: {
        categoryId,
        products: [],
      },
    };
  }
}