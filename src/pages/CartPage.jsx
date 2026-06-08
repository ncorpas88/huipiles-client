import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

import { CartContext } from "../context/cart.context";
import BackButton from "../components/BackButton";
import "../styles/CartPage.css";

function CartPage() {
  const navigate = useNavigate();
  const { cartItems, isCartLoading, updateCartItem, removeFromCart } =
    useContext(CartContext);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 150 : 0;
  const total = subtotal + shipping;

  const handleDecrease = (item) => {
    if (item.quantity <= 1) {
      removeFromCart(item.product._id);
    } else {
      updateCartItem(item.product._id, item.quantity - 1);
    }
  };

  const handleIncrease = (item) => {
    updateCartItem(item.product._id, item.quantity + 1);
  };

  if (isCartLoading) {
    return (
      <div className="cart-page">
        <div className="cart-loading">Cargando carrito...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <h1 className="cart-title">Mi Carrito</h1>
          <p className="cart-subtitle">Tu carrito está vacío.</p>
        </div>
        <div className="cart-empty">
          <ShoppingBag size={72} className="cart-empty-icon" />
          <p className="cart-empty-text">Aún no has agregado ningún producto</p>
          <button
            className="checkout-btn"
            onClick={() => navigate("/products")}
          >
            Explorar Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <BackButton />
      <div className="cart-header">
        <h1 className="cart-title">Mi Carrito</h1>
        <p className="cart-subtitle">
          Revisa tus productos antes de finalizar la compra.
        </p>
      </div>

      <div className="cart-container">
        {/* ITEMS */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.product._id} className="cart-card">
              <img
                src={item.product.image}
                alt={item.product.title}
                className="cart-image"
              />

              <div className="cart-info">
                <h2 className="item-title">{item.product.title}</h2>
                <p className="item-description">Huipil artesanal premium</p>
                <span className="item-price">${item.product.price}</span>
              </div>

              <div className="cart-actions">
                <div className="quantity-container">
                  <button
                    className="quantity-btn"
                    onClick={() => handleDecrease(item)}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="quantity-text">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleIncrease(item)}
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => removeFromCart(item.product._id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="summary-card">
          <div className="summary-header">
            <ShoppingBag size={28} />
            <h2>Resumen</h2>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Envío</span>
            <span>${shipping}</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <button className="checkout-btn" onClick={() => navigate("/checkout")}>
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
