import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";

import "../styles/SignupPage.css";
import BackButton from "../components/BackButton";

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
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

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Todos los campos son obligatorios");
    }

    try {
      setIsLoading(true);

      await api.post("/auth/signup", formData);

      navigate("/login");
    } catch (error) {
      console.log(error);

      setErrorMessage(
        error.response?.data?.errorMessage || "Error al registrar usuario",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      {/* OVERLAY */}
      <div className="signup-overlay"></div>

      {/* CARD */}
      <div className="signup-card">
        <BackButton />
        {/* LOGO */}
        <img
          src="/images/logosicaru.png"
          alt="Sicaru Logo"
          className="signup-logo"
        />

        <h1 className="signup-title">Crear Cuenta</h1>

        <p className="signup-subtitle">
          Únete a Sicaru y descubre huipiles únicos hechos con tradición,
          cultura y elegancia.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="username"
            className="signup-input"
            value={formData.username}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            className="signup-input"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            className="signup-input"
            value={formData.password}
            onChange={handleChange}
          />

          <button disabled={isLoading} className="signup-btn">
            {isLoading ? "Creando cuenta..." : "Registrarse"}
          </button>

          {errorMessage && <p className="signup-error">{errorMessage}</p>}
        </form>

        {/* FOOTER */}
        <p className="signup-footer">
          ¿Ya tienes cuenta?
          <Link to="/login" className="signup-link">
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
