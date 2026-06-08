import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { AuthContext } from "./auth.context";

const CartContext = createContext();

function CartProvider({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const refreshCart = async () => {
    setIsCartLoading(true);
    try {
      const response = await api.get("/cart");
      setCartItems(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCartLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      refreshCart();
    } else {
      setCartItems([]);
    }
  }, [isLoggedIn]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      await api.post("/cart/add", { productId, quantity });
      await refreshCart();
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      await api.put(`/cart/update/${productId}`, { quantity });
      await refreshCart();
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`);
      await refreshCart();
    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = async () => {
    try {
      await api.delete("/cart/clear");
      setCartItems([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        isCartLoading,
        refreshCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
