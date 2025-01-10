import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';


interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

const ProductCategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`
        );
        setProducts(response.data);
      } catch (error) {
        setError('Failed to load products for this category. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryId]);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Products in Category: {categoryId}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '1rem' }}>
            <img
              src={product.images[0]}
              alt={product.title}
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
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
};

export default ProductCategoryPage;
