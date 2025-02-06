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
  const [sortOption, setSortOption] = useState<string>("default");

  // ✅ Only show specific categories
  const allowedCategories = ["Electronics", "Furniture", "Clothes", "Shoes"];

  // ✅ Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://api.escuelajs.co/api/v1/categories");

        // ✅ Filter categories to only include the allowed ones
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

  // ✅ Handle filtering when category changes
  useEffect(() => {
    setVisibleCount(PRODUCTS_PER_LOAD); // Reset visible products when category changes

    let updatedProducts = products;

    if (selectedCategory !== "all") {
      updatedProducts = products.filter(
        (product) => product.category.id.toString() === selectedCategory
      );
    }

    setFilteredProducts(updatedProducts);
  }, [selectedCategory, products]);

  // ✅ Sorting function
  const getSortedProducts = () => {
    let sorted = [...filteredProducts];

    if (sortOption === "priceLowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighToLow") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOption === "nameAZ") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "nameZA") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    }

    return sorted;
  };

  // ✅ Handle Load More
  const loadMoreProducts = () => {
    setVisibleCount((prev) => prev + PRODUCTS_PER_LOAD);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Welcome to Shop Smart</h1>

      {/* ✅ Category Filter & Sorting Options */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        {/* Category Filter */}
        <div>
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

        {/* Sorting Options */}
        <div>
          <label htmlFor="sort">Sort by: </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{ padding: "0.5rem", borderRadius: "5px", marginLeft: "0.5rem" }}
          >
            <option value="default">Default</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="nameAZ">Name: A - Z</option>
            <option value="nameZA">Name: Z - A</option>
          </select>
        </div>
      </div>

      {/* ✅ Display Sorted & Visible Products */}
      <ProductList products={getSortedProducts().slice(0, visibleCount)} />

      {/* ✅ Load More Button */}
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

// ✅ Fetch products on the server
export async function getServerSideProps() {
  try {
    const response = await axios.get("https://api.escuelajs.co/api/v1/products?limit=200");
    console.log("Total products fetched:", response.data.length);

    return {
      props: {
        products: response.data, // Fetch up to 200 products
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