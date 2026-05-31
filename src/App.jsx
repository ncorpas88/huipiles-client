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

import AdminDashboard from "./pages/AdminDashboard";
import CreateProductPage from "./pages/CreateProductPage";

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

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
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        }
      />

      {/* CHECKOUT */}
      <Route
        path="/checkout"
        element={
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        }
      />

      {/* LOGIN */}
      <Route path="/login" element={<LoginPage />} />

      {/* SIGNUP */}
      <Route path="/signup" element={<SignupPage />} />

      {/* PROFILE */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />

      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      {/* CREATE PRODUCT */}
      <Route
        path="/admin/create-product"
        element={
          <AdminRoute>
            <CreateProductPage />
          </AdminRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
