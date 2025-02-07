# ShopSmart - Online Shopping Platform

## Visit our online store: 
## [Click Here](https://tokopintar.netlify.app/) 
or 
## https://tokopintar.netlify.app/

## Overview
Shop Smart is a dynamic e-commerce web application designed to provide users with a seamless shopping experience. The application includes a product catalog, shopping cart functionality, user authentication, and server-side rendering for improved performance and SEO. Built with modern web development tools, Shop Smart ensures scalability and responsiveness across various devices.

## Features Implemented
1. **Server-Side Rendering (SSR):** Ensures data is fetched on the server before rendering the page for faster load times and improved SEO.

2. **User Authentication:** Middleware integration for protecting specific routes and redirecting unauthorized users.

3. **Shopping Cart:** 
- Context-based cart management with functionality to add, remove, and clear items.
- **Enhancements**: Increase/decrease item directly in cart, Clear Cart Button with a confirmation toast.

4. **Pagination:** Efficiently handles large product datasets by displaying 12 products at first and load more button if needed.

5. **Error Handling:** Gracefully manages API fetch errors and provides fallback content.

6. **Spin-the-Wheel Rewards:**  
- Pop-up appears on the first visit or when clicking "Shop Smart".  
- Users spin for **discounts, free shipping, or a mystery gift**.  
- Applied automatically to checkout.

7. **Wishlist Functionality:**  
- Save items with a simple ❤️ click.  
- Items stay in the wishlist until removed.  

8. **Product Sorting & Filtering:**  
- Sort **alphabetically** or **by price** (low to high & high to low).  
- Filter products **by category**. 

9. **Improved Checkout Experience:**  
- Discounts & prizes are applied automatically.  
- Users can **continue shopping** without losing cart items.


## Installation Instructions
1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd shop-smart
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env.local` file in the root directory and configure the following:
   ```env
   NEXT_PUBLIC_API_URL=https://api.escuelajs.co/api/v1
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at [http://localhost:3000](http://localhost:3000).

5. **Run Tests:**
   ```bash
   npm test
   ```
   Executes unit tests for critical components.

## Testing Methodologies Used
1. **Unit Testing:**
   - Tested individual components like `ProductList`, `Cart`, and `LoginModal` using Jest and React Testing Library.
   - Verified rendering of elements, data fetching, and user interactions.

2. **Integration Testing:**
   - Tested the interaction between components, such as the `Cart` and `ProductList` components.

3. **Error Simulation:**
   - Ensured graceful handling of API errors and invalid user inputs.

4. **Mocking:**
   - Mocked API responses and context providers (e.g., `useCart`) to isolate and test functionality.

## Technologies Used
1. **Frontend Framework:**
   - Next.js for server-side rendering and routing.
   - React for building reusable components.

2. **State Management:**
   - React Context API for managing the cart state.

3. **Styling:**
   - CSS for custom styling and responsive design.

4. **Testing Tools:**
   - Jest for running test suites.
   - React Testing Library for DOM testing.

5. **API Integration:**
   - Axios for fetching data from the REST API.

6. **Middleware:**
   - Custom middleware for user authentication and route protection.



