# ShopSmart - Online Shopping Platform

## Visit our online store: 
## [Click Here](https://tokopintar.netlify.app/) 
or 
## https://tokopintar.netlify.app/

This website provides a responsive online shopping platform built using **React**, **TypeScript**, and **Vite**. The application integrates with the **EscuelaJS API** to display products and offers features like category-based filtering, a slide-in shopping cart, and a seamless user experience across devices.

## **Overview of the Website**
ShopSmart enables users to browse products by categories, view detailed product information, and add items to their cart. The application implements a mobile-friendly layout and uses React Router for navigation.

## **Features Implemented**

### Product Listing Page
- Displays a grid of products with images, prices, and titles.
- Responsive design with a flexible grid layout that adjusts for desktops, tablets, and mobile screens.
- Pagination to display 24 products per page.

### Product Category Page
- Allows users to filter and view products by category.
- Dynamically fetched category list from the API.
- "Add to Cart" buttons for each product.

### Product Detail Page
- Shows detailed product information, including title, description, price, and image.
- "Add to Cart" button for each product.

### Shopping Cart Panel
- Slide-in panel that displays the items in the cart.
- Options to adjust item quantities and remove products.
- Displays the total cost and provides a "Checkout" button.

### Confirmation Page
- After completing the checkout process, displays a confirmation message: "Thank you! Your order has been processed."

### Login Modal (Simulated)
- A modal for user login (email and password input).
- Once logged in, the user is marked as "logged in" and a "Logout" button is shown.


## **Technologies Used**

### Frontend
- **React** (with Hooks)
- **TypeScript**
- **Vite** for optimized builds and fast development
- **React Router DOM** for client-side routing

### API
- Data fetched from the [EscuelaJS API](https://api.escuelajs.co/api/v1/products)

### Styling
- **CSS Flexbox and Grid** for a responsive layout
- Global styling using **index.css**

### Development Tools
- **Visual Studio Code (VS Code)** for development
- **GitHub** for version control
- **npm/yarn** for dependency management

## **Future Improvements:**
- Sort the products based on its price and/or alphabetical order
- Improve the design and also user experience