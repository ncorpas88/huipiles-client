import { useEffect, useState } from "react";

import { ShoppingCart, Menu, Search, Camera, X } from "lucide-react";

import { Link } from "react-router-dom";

import api from "../services/api";

import "../styles/HomePage.css";
import "../styles/ProductsPage.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await api.get("/products");

      setProducts(response.data);
    } catch (error) {
      console.log(error);

      /* PRODUCTOS DEMO */
      setProducts([
        {
          _id: "1",
          title: "Huipil Oaxaca",
          description: "Bordado artesanal premium",
          price: 1200,
          image: "/images/huipil1.jpg",
        },
        {
          _id: "2",
          title: "Huipil Chiapas",
          description: "Diseño tradicional mexicano",
          price: 1500,
          image: "/images/huipil2.jpg",
        },
        {
          _id: "3",
          title: "Huipil Puebla",
          description: "Diseño floral elegante",
          price: 1800,
          image: "/images/huipil3.jpg",
        },
        {
          _id: "4",
          title: "Huipil Yucatán",
          description: "Artesanía exclusiva",
          price: 2100,
          image: "/images/huipil4.jpg",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="products-loading">Cargando productos...</div>;
  }

  return (
    <div className="products-page">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          {/* MENU */}
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* LOGO */}
          <Link to="/">
            <img src="/images/logosicaru.png" alt="Logo" className="logo" />
          </Link>
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

            <span className="cart-badge">0</span>
          </Link>
        </div>
      </nav>

      {/* SIDEBAR */}
      <div className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        {/* CLOSE BUTTON */}
        <button
          className="close-sidebar-btn"
          onClick={() => setMenuOpen(false)}
        >
          <X size={26} />
        </button>

        <Link
          to="/"
          className="sidebar-link"
          onClick={() => setMenuOpen(false)}
        >
          Inicio
        </Link>

        <Link
          to="/products"
          className="sidebar-link"
          onClick={() => setMenuOpen(false)}
        >
          Productos
        </Link>

        <Link
          to="/profile"
          className="sidebar-link"
          onClick={() => setMenuOpen(false)}
        >
          Perfil
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

      {/* HEADER */}
      <div className="products-header">
        <h1 className="products-title">Todos los Huipiles</h1>

        <p className="products-subtitle">
          Descubre piezas artesanales únicas hechas con tradición, cultura y
          elegancia.
        </p>
      </div>

      {/* GRID */}
      <div className="products-grid">
        {products.map((product) => {
          return (
            <div key={product._id} className="product-card">
              {/* IMAGE */}
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />

              {/* CONTENT */}
              <div className="product-content">
                <h2 className="product-title">{product.title}</h2>

                <p className="product-description">{product.description}</p>

                <div className="product-footer">
                  <span className="product-price">${product.price}</span>

                  <Link to={`/products/${product._id}`} className="details-btn">
                    Ver Más
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductsPage;
