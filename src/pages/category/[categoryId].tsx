// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useCart } from "@/context/CartContext";

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   images: string[];
// }

// interface Props {
//   categoryId: string;
//   products: Product[];
// }

// export default function ProductCategoryPage({ categoryId, products }: Props) {
//   const { addToCart } = useCart();
//   const [sortedProducts, setSortedProducts] = useState(products);
//   const [sortType, setSortType] = useState("");

//   // Reset sorted products when the category or products change
//   useEffect(() => {
//     setSortedProducts(products);
//   }, [products]);

//   const handleSort = (type: string) => {
//     setSortType(type); // Store sort preference for UI updates

//     const sorted = [...products].sort((a, b) => {
//       if (type === "priceLowToHigh") return a.price - b.price;
//       if (type === "priceHighToLow") return b.price - a.price;
//       if (type === "name") return a.title.localeCompare(b.title);
//       return 0;
//     });

//     setSortedProducts(sorted);
//   };

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h2>Products in Category: {categoryId}</h2>

//       {/* Sorting Options */}
//       <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
//         <button
//           onClick={() => handleSort("priceLowToHigh")}
//           style={{
//             backgroundColor: sortType === "priceLowToHigh" ? "#007bff" : "#ddd",
//             color: sortType === "priceLowToHigh" ? "#fff" : "#000",
//             padding: "0.5rem",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Price: Low to High
//         </button>
//         <button
//           onClick={() => handleSort("priceHighToLow")}
//           style={{
//             backgroundColor: sortType === "priceHighToLow" ? "#007bff" : "#ddd",
//             color: sortType === "priceHighToLow" ? "#fff" : "#000",
//             padding: "0.5rem",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Price: High to Low
//         </button>
//         <button
//           onClick={() => handleSort("name")}
//           style={{
//             backgroundColor: sortType === "name" ? "#007bff" : "#ddd",
//             color: sortType === "name" ? "#fff" : "#000",
//             padding: "0.5rem",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Name
//         </button>
//       </div>

//       {/* Product Grid */}
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
//         {sortedProducts.map((product) => (
//           <div key={product.id} style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "8px" }}>
//             <img
//               src={product.images[0] || "https://via.placeholder.com/150"}
//               alt={product.title}
//               style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }}
//             />
//             <h3>{product.title}</h3>
//             <p>${product.price.toFixed(2)}</p>
//             <button
//               onClick={() =>
//                 addToCart({
//                   id: product.id,
//                   title: product.title,
//                   price: product.price,
//                   image: product.images[0],
//                   quantity: 1,
//                 })
//               }
//               style={{
//                 backgroundColor: "#28a745",
//                 color: "#fff",
//                 padding: "0.5rem",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//                 marginTop: "0.5rem",
//               }}
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
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
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products || []);
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    setSortedProducts(products || []);
  }, [products]);

  const handleSort = (type: string) => {
    setSortType(type);
    const sorted = [...sortedProducts].sort((a, b) => {
      if (type === "priceLowToHigh") return a.price - b.price;
      if (type === "priceHighToLow") return b.price - a.price;
      if (type === "name") return a.title.localeCompare(b.title);
      return 0;
    });

    setSortedProducts(sorted);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Products in Category: {categoryId}</h2>

      {sortedProducts.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <>
          {/* Sorting Options */}
          <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
            <button onClick={() => handleSort("priceLowToHigh")}>Price: Low to High</button>
            <button onClick={() => handleSort("priceHighToLow")}>Price: High to Low</button>
            <button onClick={() => handleSort("name")}>Name</button>
          </div>

          {/* Product Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {sortedProducts.map((product) => (
              <div key={product.id} style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "8px" }}>
                <img
                  src={product.images?.[0] || "https://via.placeholder.com/150"}
                  alt={product.title}
                  style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }}
                />
                <h3>{product.title}</h3>
                <p>${product.price.toFixed(2)}</p>
                <button onClick={() => addToCart({ id: product.id, title: product.title, price: product.price, image: product.images?.[0], quantity: 1 })}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Fetch category products dynamically
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const categoryId = params?.categoryId as string;
  try {
    const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
    return {
      props: {
        categoryId,
        products: response.data || [],
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
};