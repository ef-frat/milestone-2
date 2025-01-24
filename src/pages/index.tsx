import React from "react";
import ProductList from "@/components/ProductList";
import axios from "axios";

// Define the Product type
interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

// Props for the HomePage component
interface HomePageProps {
  products: Product[];
}

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>Welcome to Shop Smart</h1>
      {/* Pass the products fetched on the server to the ProductList */}
      <ProductList products={products} />
    </div>
  );
};

// Server-side function to fetch product data
export async function getServerSideProps() {
  try {
    const response = await axios.get("https://api.escuelajs.co/api/v1/products");
    return {
      props: {
        products: response.data.slice(0, 24), // Limit to 24 products
      },
    };
  } catch (error) {
    console.error("Failed to fetch products on the server:", error);
    return {
      props: {
        products: [], // Return an empty array if the fetch fails
      },
    };
  }
}

export default HomePage;