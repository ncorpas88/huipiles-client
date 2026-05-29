import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      {/* HOME */}
      <Route path="/" element={<HomePage />} />

      {/* PRODUCTS */}
      <Route path="/products" element={<ProductsPage />} />

      {/* PRODUCT DETAILS */}
      <Route path="/products/:productId" element={<ProductDetailsPage />} />

      {/* CART */}
      <Route path="/cart" element={<CartPage />} />

      {/* CHECKOUT */}
      <Route path="/checkout" element={<CheckoutPage />} />

      {/* LOGIN */}
      <Route path="/login" element={<LoginPage />} />

      {/* SIGNUP */}
      <Route path="/signup" element={<SignupPage />} />

      {/* PROFILE */}
      <Route path="/profile" element={<ProfilePage />} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
