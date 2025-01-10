import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { useCart } from './context/CartContext';
import CheckoutPage from './components/CheckoutPage';
import LoginModal from './components/LoginModal';
import ProductCategoryPage from './components/ProductCategoryPage';
import ProductDetailPage from './components/ProductDetailPage';

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [isLoginOpen, setIsLoginOpen] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); 
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false); 
  };

  return (
    <Router>
      <div className="App">
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h1>SHOP SMART</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              style={{ position: 'relative', fontSize: '1.2rem', cursor: 'pointer' }}
            >
              🛒
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '0px',
                    right: '-10px',
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.8rem',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {!isLoggedIn ? (
              <button onClick={() => setIsLoginOpen(true)} style={{ cursor: 'pointer' }}>
                 Login
              </button>
            ) : (
              <button onClick={handleLogout} 
                      style={{ 
                        cursor: 'pointer',
                        backgroundColor: '#ff4d4d',
                        color: '#fff',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        }}>
                 Logout
              </button>
            )}
          </div>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/category/:categoryId" element={<ProductCategoryPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        {/* Login Modal */}
        {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} onSuccess={handleLoginSuccess} />}
      </div>
    </Router>
  );
};

export default App;






