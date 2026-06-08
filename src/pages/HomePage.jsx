import { useContext, useState } from "react";
import { ShoppingCart, Menu, Search, Camera, X } from "lucide-react";
import { Link } from "react-router-dom";

import { CartContext } from "../context/cart.context";
import "../styles/HomePage.css";

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useContext(CartContext);

  return (
    <div className="homepage">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <img
            src="/images/logosicaru.png"
            alt="Sicaru Logo"
            className="logo"
          />
        </div>

        <div className="search-container">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar productos..."
            className="search-input"
          />
        </div>

        <div className="nav-right">
          <button className="filter-btn">Filtros</button>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="icon-btn"
          >
            <Camera size={24} />
          </a>

          <Link to="/cart" className="icon-btn">
            <ShoppingCart size={26} />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
        </div>
      </nav>

      {/* SIDEBAR MENU */}
      <div className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <button className="close-sidebar-btn" onClick={() => setMenuOpen(false)}>
          <X size={28} />
        </button>

        <Link to="/profile" className="sidebar-link" onClick={() => setMenuOpen(false)}>Perfil</Link>
        <Link to="/products" className="sidebar-link" onClick={() => setMenuOpen(false)}>Productos</Link>
        <Link to="/cart" className="sidebar-link" onClick={() => setMenuOpen(false)}>Carrito</Link>
        <Link to="/login" className="sidebar-link" onClick={() => setMenuOpen(false)}>Login</Link>
        <Link to="/signup" className="sidebar-link" onClick={() => setMenuOpen(false)}>Registrarse</Link>
      </div>

      {/* HERO */}
      <section className="hero">
        <h1 className="hero-title">Sicaru</h1>

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
          <div className="product-card">
            <img src="/images/huipil1.jpg" alt="Huipil Oaxaca" className="product-image" />
            <div className="product-content">
              <h3 className="product-title">Huipil Oaxaca</h3>
              <p className="product-description">Artesanal bordado a mano</p>
              <div className="product-footer">
                <span className="product-price">$1200</span>
                <Link to="/products" className="buy-btn">Ver Más</Link>
              </div>
            </div>
          </div>

          <div className="product-card">
            <img src="/images/huipil2.jpg" alt="Huipil Chiapas" className="product-image" />
            <div className="product-content">
              <h3 className="product-title">Huipil Chiapas</h3>
              <p className="product-description">Diseño tradicional</p>
              <div className="product-footer">
                <span className="product-price">$1500</span>
                <Link to="/products" className="buy-btn">Ver Más</Link>
              </div>
            </div>
          </div>

          <div className="product-card">
            <img src="/images/huipil3.jpeg" alt="Huipil Puebla" className="product-image" />
            <div className="product-content">
              <h3 className="product-title">Huipil Puebla</h3>
              <p className="product-description">Diseño floral elegante</p>
              <div className="product-footer">
                <span className="product-price">$1800</span>
                <Link to="/products" className="buy-btn">Ver Más</Link>
              </div>
            </div>
          </div>

          <div className="product-card">
            <img src="/images/huipil4.jpeg" alt="Huipil Yucatán" className="product-image" />
            <div className="product-content">
              <h3 className="product-title">Huipil Yucatán</h3>
              <p className="product-description">Bordado artesanal premium</p>
              <div className="product-footer">
                <span className="product-price">$2100</span>
                <Link to="/products" className="buy-btn">Ver Más</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
