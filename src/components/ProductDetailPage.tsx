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
  category: {
    id: number;
    name: string;
  };
}

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        setError('Failed to load product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) return <div>Loading product details...</div>;
  if (error || !product) return <div>{error || 'Product not found'}</div>;

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

export default ProductDetailPage;

const styles = {
  container: {
    display: 'flex',
    gap: '2rem',
    padding: '2rem',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '400px',
    objectFit: 'cover' as 'cover',
    borderRadius: '8px',
  },
  detailsContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '1rem',
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: 'bold' as 'bold',
  },
  category: {
    fontStyle: 'italic' as 'italic',
    color: '#555',
  },
  description: {
    marginTop: '1rem',
    lineHeight: '1.5',
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
};
