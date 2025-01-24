// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const CheckoutPage: React.FC = () => {
//   const navigate = useNavigate();

//   const handleReturnToShop = () => {
//     navigate('/');
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.heading}>🎉 Thank You!</h1>
//       <p>Your order has been processed successfully.</p>
//       <button style={styles.button} onClick={handleReturnToShop}>
//         Continue Shopping
//       </button>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     textAlign: 'center' as 'center',
//     padding: '2rem',
//   },
//   heading: {
//     fontSize: '2rem',
//     marginBottom: '1rem',
//   },
//   button: {
//     backgroundColor: '#4CAF50',
//     color: '#fff',
//     border: 'none',
//     padding: '0.75rem 1.5rem',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     marginTop: '1rem',
//   },
// };

// export default CheckoutPage;

import { useRouter } from "next/router";

const CheckoutPage: React.FC = () => {
  const router = useRouter();

  const handleReturnToShop = () => {
    router.push("/"); // Navigate to the homepage
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎉 Thank You!</h1>
      <p>Your order has been processed successfully.</p>
      <button style={styles.button} onClick={handleReturnToShop}>
        Continue Shopping
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center" as "center",
    padding: "2rem",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "1rem",
  },
};

export default CheckoutPage;