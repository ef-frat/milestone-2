import React, { useState, useEffect } from "react";
import ProductList from "@/components/ProductList";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: { id: number; name: string };
}

interface Category {
  id: number;
  name: string;
}

interface HomePageProps {
  products: Product[];
}

const PRODUCTS_PER_LOAD = 12; // Number of products to load at a time

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_LOAD);

  // Fetch categories on mount
const allowedCategories = ["Electronics", "Furniture", "Clothes", "Shoes"];

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://api.escuelajs.co/api/v1/categories");

      // Filter categories to show only the allowed ones
      const filteredCategories = response.data.filter((category: Category) =>
        allowedCategories.includes(category.name)
      );

      setCategories(filteredCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  fetchCategories();
}, []);

  // Filter products when category changes
  useEffect(() => {
    setVisibleCount(PRODUCTS_PER_LOAD); // Reset visible products when category changes
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.category.id.toString() === selectedCategory));
    }
  }, [selectedCategory, products]);

  // Handle Load More
  const loadMoreProducts = () => {
    setVisibleCount((prev) => prev + PRODUCTS_PER_LOAD);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Welcome to Shop Smart</h1>

      {/* Category Filter Dropdown */}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="category">Filter by Category: </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "5px", marginLeft: "0.5rem" }}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id.toString()}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display Visible Products */}
      <ProductList products={filteredProducts.slice(0, visibleCount)} />

      {/* Load More Button */}
      {visibleCount < filteredProducts.length && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <button
            onClick={loadMoreProducts}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "5px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

// Fetch products on the server
export async function getServerSideProps() {
  try {
    const response = await axios.get("https://api.escuelajs.co/api/v1/products?limit=200");
    console.log("Total products fetched:", response.data.length);
    
    return {
      props: {
        products: response.data, 
      },
    };
  } catch (error) {
    console.error("Failed to fetch products on the server:", error);
    return {
      props: {
        products: [],
      },
    };
  }
}

export default HomePage;