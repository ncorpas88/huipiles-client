import { ShoppingCart, Menu, Search, Camera, X } from "lucide-react";

import { Link } from "react-router-dom";

import { useState } from "react";

import "../styles/HomePage.css";

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="homepage">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          {/* MENU */}
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* LOGO */}
          <img
            src="/images/logosicaru.png"
            alt="Sicaru Logo"
            className="logo"
          />
        </div>

        {/* SEARCH */}
        <div className="search-container">
          <Search size={20} />

          <input
            type="text"
            placeholder="Buscar productos..."
            className="search-input"
          />
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          {/* FILTER */}
          <button className="filter-btn">Filtros</button>

          {/* INSTAGRAM */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="icon-btn"
          >
            <Camera size={24} />
          </a>

          {/* CART */}
          <Link to="/cart" className="icon-btn">
            <ShoppingCart size={26} />

            <span className="cart-badge">0</span>
          </Link>
        </div>
      </nav>

      {/* SIDEBAR MENU */}
      <div className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        {/* CLOSE BUTTON */}
        <button
          className="close-sidebar-btn"
          onClick={() => setMenuOpen(false)}
        >
          <X size={28} />
        </button>
        <Link
          to="/profile"
          className="sidebar-link"
          onClick={() => setMenuOpen(false)}
        >
          Perfil
        </Link>

        <Link
          to="/products"
          className="sidebar-link"
          onClick={() => setMenuOpen(false)}
        >
          Productos
        </Link>

        <Link
          to="/cart"
          className="sidebar-link"
          onClick={() => setMenuOpen(false)}
        >
          Carrito
        </Link>

        <Link
          to="/login"
          className="sidebar-link"
          onClick={() => setMenuOpen(false)}
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="sidebar-link"
          onClick={() => setMenuOpen(false)}
        >
          Registrarse
        </Link>
      </div>

      {/* HERO */}
      <section className="hero">
        <h1 className="hero-title">SICARU</h1>

        <p className="hero-text">
          Huipiles artesanales únicos, hechos con tradición, cultura y
          elegancia.
        </p>

        <Link to="/products" className="hero-btn">
          Ver Colección
        </Link>
      </section>

      {/* PRODUCTS */}
      <section className="products-section">
        <h2 className="section-title">Productos Destacados</h2>

        <div className="products-grid">
          {/* CARD 1 */}
          <div className="product-card">
            <img
              src="/images/huipil1.jpg"
              alt="Huipil Oaxaca"
              className="product-image"
            />

            <div className="product-content">
              <h3 className="product-title">Huipil Oaxaca</h3>

              <p className="product-description">Artesanal bordado a mano</p>

              <div className="product-footer">
                <span className="product-price">$1200</span>

                <button className="buy-btn">Comprar</button>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="product-card">
            <img
              src="/images/huipil2.jpg"
              alt="Huipil Chiapas"
              className="product-image"
            />

            <div className="product-content">
              <h3 className="product-title">Huipil Chiapas</h3>

              <p className="product-description">Diseño tradicional</p>

              <div className="product-footer">
                <span className="product-price">$1500</span>

                <button className="buy-btn">Comprar</button>
              </div>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="product-card">
            <img
              src="/images/huipil3.jpeg"
              alt="Huipil Puebla"
              className="product-image"
            />

            <div className="product-content">
              <h3 className="product-title">Huipil Puebla</h3>

              <p className="product-description">Diseño floral elegante</p>

              <div className="product-footer">
                <span className="product-price">$1800</span>

                <button className="buy-btn">Comprar</button>
              </div>
            </div>
          </div>

          {/* CARD 4 */}
          <div className="product-card">
            <img
              src="/images/huipil4.jpeg"
              alt="Huipil Yucatán"
              className="product-image"
            />

            <div className="product-content">
              <h3 className="product-title">Huipil Yucatán</h3>

              <p className="product-description">Bordado artesanal premium</p>

              <div className="product-footer">
                <span className="product-price">$2100</span>

                <button className="buy-btn">Comprar</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
