import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";
import api from "../services/api";
import BackButton from "../components/BackButton";
import "../styles/CheckoutPage.css";

function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { cartItems, isCartLoading, clearCart } = useContext(CartContext);

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shipping = 150;
  const total = subtotal + shipping;

  useEffect(() => {
    if (!isCartLoading && cartItems.length === 0 && !orderPlaced) {
      navigate("/cart");
    }
  }, [cartItems, isCartLoading, orderPlaced]);

  const handleChange = (e) => {
    setErrorMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode ||
      !formData.phone
    ) {
      return setErrorMessage("Todos los campos son obligatorios");
    }

    try {
      setIsLoading(true);

      await api.post("/orders", {
        products: cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        totalPrice: total,
      });

      await clearCart();
      setOrderPlaced(true);
    } catch (error) {
      console.log(error);
      setErrorMessage("Error al procesar el pedido. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="checkout-success">
          <div className="success-icon">✓</div>
          <h1 className="success-title">¡Pedido Realizado!</h1>
          <p className="success-text">
            Gracias por tu compra. Tu huipil artesanal está en camino. Recibirás
            una confirmación pronto.
          </p>
          <button className="success-btn" onClick={() => navigate("/products")}>
            Seguir Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <BackButton />
      <div className="checkout-header">
        <h1 className="checkout-title">Finalizar Compra</h1>
        <p className="checkout-subtitle">Ingresa tus datos de envío</p>
      </div>

      <div className="checkout-container">
        {/* FORMULARIO */}
        <div className="checkout-form-card">
          <h2 className="form-section-title">Datos de Envío</h2>

          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label>Nombre completo</label>
              <input
                type="text"
                name="fullName"
                placeholder="Tu nombre completo"
                className="form-input"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Dirección</label>
              <input
                type="text"
                name="address"
                placeholder="Calle, número, colonia"
                className="form-input"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Ciudad</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Ciudad"
                  className="form-input"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Código postal</label>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="C.P."
                  className="form-input"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="text"
                name="phone"
                placeholder="Número de contacto"
                className="form-input"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {errorMessage && <p className="form-error">{errorMessage}</p>}

            <button
              type="submit"
              className="place-order-btn"
              disabled={isLoading}
            >
              {isLoading ? "Procesando..." : "Confirmar Pedido"}
            </button>
          </form>
        </div>

        {/* RESUMEN */}
        <div className="checkout-summary-card">
          <h2 className="form-section-title">Tu Pedido</h2>

          <div className="checkout-items-list">
            {cartItems.map((item) => (
              <div key={item.product._id} className="checkout-item">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="checkout-item-img"
                />
                <div className="checkout-item-info">
                  <p className="checkout-item-title">{item.product.title}</p>
                  <p className="checkout-item-qty">Cant: {item.quantity}</p>
                </div>
                <span className="checkout-item-price">
                  ${item.product.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="checkout-totals">
            <div className="checkout-row">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="checkout-row">
              <span>Envío</span>
              <span>${shipping}</span>
            </div>
            <div className="checkout-total-row">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          <p className="checkout-user-info">Cuenta: {user?.email}</p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
