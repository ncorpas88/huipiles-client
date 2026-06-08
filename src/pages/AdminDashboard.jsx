import {
  Package,
  ShoppingBag,
  Users,
  CreditCard,
  Plus,
  LayoutDashboard,
} from "lucide-react";

import { Link } from "react-router-dom";

import "../styles/AdminDashboard.css";
import BackButton from "../components/BackButton";

function AdminDashboard() {
  return (
    <div className="admin-page">
      {/* OVERLAY */}
      <div className="admin-overlay"></div>

      <BackButton />

      {/* HEADER */}
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Admin Dashboard</h1>

          <p className="admin-subtitle">
            Gestiona productos, órdenes, usuarios y pagos de Sicaru.
          </p>
        </div>

        <div className="admin-icon-wrapper">
          <LayoutDashboard size={42} />
        </div>
      </div>

      {/* STATS */}
      <div className="admin-stats">
        {/* CARD */}
        <div className="admin-stat-card">
          <Package size={34} className="admin-stat-icon" />

          <h2>Productos</h2>

          <span>24</span>
        </div>

        {/* CARD */}
        <div className="admin-stat-card">
          <ShoppingBag size={34} className="admin-stat-icon" />

          <h2>Órdenes</h2>

          <span>12</span>
        </div>

        {/* CARD */}
        <div className="admin-stat-card">
          <Users size={34} className="admin-stat-icon" />

          <h2>Usuarios</h2>

          <span>8</span>
        </div>

        {/* CARD */}
        <div className="admin-stat-card">
          <CreditCard size={34} className="admin-stat-icon" />

          <h2>Ventas</h2>

          <span>$14K</span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="admin-actions">
        <Link to="/admin/create-product" className="admin-btn">
          <Plus size={20} />
          Crear Producto
        </Link>

        <Link to="/products" className="admin-btn secondary-btn">
          Ver Tienda
        </Link>
      </div>

      {/* TABLE */}
      <div className="admin-table-wrapper">
        <h2 className="admin-table-title">Productos recientes</h2>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Huipil Oaxaca</td>
              <td>$1200</td>
              <td>12</td>
              <td>
                <span className="status active">Disponible</span>
              </td>
            </tr>

            <tr>
              <td>Huipil Chiapas</td>
              <td>$1500</td>
              <td>4</td>
              <td>
                <span className="status low">Bajo stock</span>
              </td>
            </tr>

            <tr>
              <td>Huipil Puebla</td>
              <td>$1800</td>
              <td>0</td>
              <td>
                <span className="status out">Agotado</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
