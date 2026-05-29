import { useState, useContext } from "react";

import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";

import { AuthContext } from "../context/auth.context";

import "../styles/LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const { verifyUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setErrorMessage("");

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return setErrorMessage("Todos los campos son obligatorios");
    }

    try {
      setIsLoading(true);

      const response = await api.post("/auth/login", formData);

      localStorage.setItem("authToken", response.data.authToken);

      await verifyUser();

      navigate("/");
    } catch (error) {
      console.log(error);

      setErrorMessage(
        error.response?.data?.errorMessage || "Error al iniciar sesión",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* OVERLAY */}
      <div className="login-overlay"></div>

      {/* CARD */}
      <div className="login-card">
        {/* LOGO */}
        <img
          src="/images/logosicaru.png"
          alt="Sicaru Logo"
          className="login-logo"
        />

        <h1 className="login-title">Bienvenida a Sicaru</h1>

        <p className="login-subtitle">
          Accede a tu cuenta y descubre huipiles únicos hechos con tradición y
          elegancia.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            className="login-input"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            className="login-input"
            value={formData.password}
            onChange={handleChange}
          />

          <button disabled={isLoading} className="login-btn">
            {isLoading ? "Ingresando..." : "Iniciar Sesión"}
          </button>

          {errorMessage && <p className="login-error">{errorMessage}</p>}
        </form>

        {/* FOOTER */}
        <p className="login-footer">
          ¿No tienes cuenta?
          <Link to="/signup" className="login-link">
            Registrarse
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
