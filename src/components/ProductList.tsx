import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

interface Category {
  id: number;
  name: string;
}

const PRODUCTS_PER_PAGE = 24;

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.escuelajs.co/api/v1/products');
        setProducts(response.data);
      } catch (error) {
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const currentProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Categories</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', overflowX: 'auto' }}>
        {categories.map((category) => (
          <Link
            to={`/category/${category.id}`}
            key={category.id}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#f0f0f0',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#333',
              whiteSpace: 'nowrap',
            }}
          >
            {category.name}
          </Link>
        ))}
      </div>

      <h2>Our Products:</h2>
      <div className="product-grid">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
              <img
                src={product.images[0]}
                alt={product.title}
                className="product-image"
              />
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
            </Link>
            <div style={{ textAlign: 'center', marginTop: 'auto' }}>
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
                className="add-to-cart-button"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ marginRight: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{ marginLeft: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          Next
        </button>
      </div>

      <style>
        {`
          .product-grid {
            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(3, 1fr);
          }

          .product-card {
            border: 1px solid #ddd;
            padding: 1rem;
            border-radius: 8px;
            height: 350px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .product-image {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border-radius: 8px;
          }

          .product-title {
            text-align: center;
            margin-top: 1rem;
          }

          .product-price {
            text-align: center;
            font-weight: bold;
          }

          .add-to-cart-button {
            background-color: #4caf50;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            cursor: pointer;
            width: 60%;
          }

          @media (max-width: 768px) {
            .product-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 480px) {
            .product-grid {
              grid-template-columns: 1fr;
            }

            .product-card {
              height: auto;
            }

            .add-to-cart-button {
              width: 100%;
              font-size: 1rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProductList;
