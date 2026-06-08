import { useContext, useEffect, useState } from "react";
import { ShoppingCart, Menu, Search, Camera, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";
import "../styles/HomePage.css";
import "../styles/ProductsPage.css";

function ProductsPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const { cartCount, addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
      setProducts([
        { _id: "1", title: "Huipil Oaxaca", description: "Bordado artesanal premium", price: 1200, image: "/images/huipil1.jpg" },
        { _id: "2", title: "Huipil Chiapas", description: "Diseño tradicional mexicano", price: 1500, image: "/images/huipil2.jpg" },
        { _id: "3", title: "Huipil Puebla", description: "Diseño floral elegante", price: 1800, image: "/images/huipil3.jpg" },
        { _id: "4", title: "Huipil Yucatán", description: "Artesanía exclusiva", price: 2100, image: "/images/huipil4.jpg" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    await addToCart(productId);
    setAddedId(productId);
    setTimeout(() => setAddedId(null), 1500);
  };

  if (loading) {
    return <div className="products-loading">Cargando productos...</div>;
  }

  return (
    <div className="products-page">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <Link to="/">
            <img src="/images/logosicaru.png" alt="Logo" className="logo" />
          </Link>
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

      {/* SIDEBAR */}
      <div className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <button className="close-sidebar-btn" onClick={() => setMenuOpen(false)}>
          <X size={26} />
        </button>

        <Link to="/" className="sidebar-link" onClick={() => setMenuOpen(false)}>Inicio</Link>
        <Link to="/products" className="sidebar-link" onClick={() => setMenuOpen(false)}>Productos</Link>
        <Link to="/profile" className="sidebar-link" onClick={() => setMenuOpen(false)}>Perfil</Link>
        <Link to="/cart" className="sidebar-link" onClick={() => setMenuOpen(false)}>Carrito</Link>
        <Link to="/login" className="sidebar-link" onClick={() => setMenuOpen(false)}>Login</Link>
        <Link to="/signup" className="sidebar-link" onClick={() => setMenuOpen(false)}>Registrarse</Link>
      </div>

      {/* HEADER */}
      <div className="products-header">
        <h1 className="products-title">Todos los Huipiles</h1>
        <p className="products-subtitle">
          Descubre piezas artesanales únicas hechas con tradición, cultura y elegancia.
        </p>
      </div>

      {/* GRID */}
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <div className="product-content">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-description">{product.description}</p>

              <div className="product-footer">
                <span className="product-price">${product.price}</span>
                <div className="product-actions">
                  <button
                    className={`add-cart-btn ${addedId === product._id ? "added" : ""}`}
                    onClick={() => handleAddToCart(product._id)}
                  >
                    {addedId === product._id ? "✓ Añadido" : "+ Carrito"}
                  </button>
                  <Link to={`/products/${product._id}`} className="details-btn">
                    Ver Más
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
