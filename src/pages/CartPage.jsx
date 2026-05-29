import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

import "../styles/CartPage.css";

function CartPage() {
  const cartItems = [
    {
      _id: "1",
      title: "Huipil Oaxaca",
      price: 1200,
      quantity: 1,
      image: "/images/huipil1.jpg",
    },
    {
      _id: "2",
      title: "Huipil Chiapas",
      price: 1500,
      quantity: 2,
      image: "/images/huipil2.jpg",
    },
  ];

  const increaseQuantity = (id) => {
    console.log("increase", id);
  };

  const decreaseQuantity = (id) => {
    console.log("decrease", id);
  };

  const removeItem = (id) => {
    console.log("remove", id);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const shipping = 150;

  const total = subtotal + shipping;

  return (
    <div className="cart-page">
      {/* HEADER */}
      <div className="cart-header">
        <h1 className="cart-title">Mi Carrito</h1>

        <p className="cart-subtitle">
          Revisa tus productos antes de finalizar la compra.
        </p>
      </div>

      <div className="cart-container">
        {/* LEFT */}
        <div className="cart-items">
          {cartItems.map((item) => {
            return (
              <div key={item._id} className="cart-card">
                {/* IMAGE */}
                <img src={item.image} alt={item.title} className="cart-image" />

                {/* INFO */}
                <div className="cart-info">
                  <h2 className="item-title">{item.title}</h2>

                  <p className="item-description">Huipil artesanal premium</p>

                  <span className="item-price">${item.price}</span>
                </div>

                {/* ACTIONS */}
                <div className="cart-actions">
                  {/* QUANTITY */}
                  <div className="quantity-container">
                    <button
                      className="quantity-btn"
                      onClick={() => decreaseQuantity(item._id)}
                    >
                      <Minus size={18} />
                    </button>

                    <span className="quantity-text">{item.quantity}</span>

                    <button
                      className="quantity-btn"
                      onClick={() => increaseQuantity(item._id)}
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  {/* DELETE */}
                  <button
                    className="delete-btn"
                    onClick={() => removeItem(item._id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT */}
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

          <button className="checkout-btn">Finalizar Compra</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
