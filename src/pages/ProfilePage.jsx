import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";

import { AuthContext } from "../context/auth.context";
import api from "../services/api";
import BackButton from "../components/BackButton";
import "../styles/ProfilePage.css";

const STATUS_LABELS = {
  pending:   "Pendiente",
  paid:      "Pagado",
  shipped:   "Enviado",
  delivered: "Entregado",
};

const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

function ProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { user: authUser, logoutUser } = useContext(AuthContext);

  const [profile, setProfile]           = useState(null);
  const [orders, setOrders]             = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingOrders, setLoadingOrders]   = useState(true);

  // Edit mode
  const [isEditing, setIsEditing]   = useState(false);
  const [formData, setFormData]     = useState({ username: "", phone: "", address: "", userimage: "" });
  const [isSaving, setIsSaving]     = useState(false);
  const [saveError, setSaveError]   = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchOrders();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/users/profile/me");
      setProfile(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingProfile(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders/my-orders");
      setOrders(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  // ── EDIT ──────────────────────────────────────────
  const enterEditMode = () => {
    setFormData({
      username:  profile?.username  || "",
      phone:     profile?.phone     || "",
      address:   profile?.address   || "",
      userimage: profile?.userimage || "",
    });
    setSaveError("");
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setSaveError("");
  };

  const handleChange = (e) => {
    setSaveError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Convert selected file to base64 and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setFormData((prev) => ({ ...prev, userimage: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError("");
    try {
      const { data } = await api.put(`/users/${authUser._id}`, formData);
      setProfile(data);
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.log(err);
      setSaveError("Error al guardar los cambios. Intenta de nuevo.");
    } finally {
      setIsSaving(false);
    }
  };

  // ── HELPERS ───────────────────────────────────────
  const totalSpent = orders.reduce((acc, o) => acc + o.totalPrice, 0);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("es-MX", {
      year: "numeric", month: "long", day: "numeric",
    });

  const avatarSrc = isEditing
    ? formData.userimage || DEFAULT_AVATAR
    : profile?.userimage || DEFAULT_AVATAR;

  // ── RENDER ────────────────────────────────────────
  return (
    <div className="profile-page">
      <BackButton />

      {/* ── HERO ── */}
      <div className="profile-hero">
        <div className="profile-avatar-wrapper">
          <img src={avatarSrc} alt="Avatar" className="profile-avatar" />

          {/* Camera overlay — only in edit mode */}
          {isEditing && (
            <button
              className="avatar-upload-btn"
              onClick={() => fileInputRef.current.click()}
              title="Cambiar foto"
            >
              <Camera size={18} />
            </button>
          )}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <div className="profile-hero-info">
          {loadingProfile ? (
            <p className="profile-email">Cargando...</p>
          ) : (
            <>
              <h1 className="profile-username">
                {profile?.username || authUser?.email}
              </h1>
              <p className="profile-email">{profile?.email}</p>
              <span className={`profile-role-badge ${profile?.role || "customer"}`}>
                {profile?.role === "admin" ? "Administrador" : "Cliente"}
              </span>
            </>
          )}
        </div>

        <div className="profile-hero-actions">
          {!isEditing && (
            <button className="profile-edit-btn" onClick={enterEditMode}>
              Editar perfil
            </button>
          )}
          <button className="profile-logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* ── SUCCESS TOAST ── */}
      {saveSuccess && (
        <div className="save-success-toast">
          ✓ Perfil actualizado correctamente
        </div>
      )}

      {/* ── INFO GRID ── */}
      <div className="profile-grid">

        {/* INFO CARD — view or edit */}
        <div className="profile-card">
          <div className="profile-card-header">
            <h2 className="profile-card-title">Información Personal</h2>
          </div>

          {isEditing ? (
            /* ── EDIT FORM ── */
            <div className="edit-form">
              <div className="edit-field">
                <label className="edit-label">👤 Usuario</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="edit-input"
                  placeholder="Tu nombre de usuario"
                />
              </div>

              <div className="edit-field">
                <label className="edit-label">📱 Teléfono</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="edit-input"
                  placeholder="Número de teléfono"
                />
              </div>

              <div className="edit-field">
                <label className="edit-label">📍 Dirección</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="edit-input"
                  placeholder="Tu dirección"
                />
              </div>

              <div className="edit-field">
                <label className="edit-label">🖼️ URL de imagen</label>
                <input
                  type="text"
                  name="userimage"
                  value={
                    formData.userimage.startsWith("data:")
                      ? ""
                      : formData.userimage
                  }
                  onChange={handleChange}
                  className="edit-input"
                  placeholder="https://... (o usa el botón de la foto)"
                />
              </div>

              {saveError && <p className="edit-error">{saveError}</p>}

              <div className="edit-actions">
                <button
                  className="edit-save-btn"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? "Guardando..." : "Guardar cambios"}
                </button>
                <button className="edit-cancel-btn" onClick={cancelEdit}>
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            /* ── VIEW MODE ── */
            <>
              <div className="info-row">
                <span className="info-icon">👤</span>
                <div className="info-content">
                  <p className="info-label">Usuario</p>
                  <p className="info-value">{profile?.username || "—"}</p>
                </div>
              </div>

              <div className="info-row">
                <span className="info-icon">📧</span>
                <div className="info-content">
                  <p className="info-label">Correo</p>
                  <p className="info-value">{profile?.email || "—"}</p>
                </div>
              </div>

              <div className="info-row">
                <span className="info-icon">📱</span>
                <div className="info-content">
                  <p className="info-label">Teléfono</p>
                  <p className={`info-value ${!profile?.phone ? "empty" : ""}`}>
                    {profile?.phone || "Sin teléfono registrado"}
                  </p>
                </div>
              </div>

              <div className="info-row">
                <span className="info-icon">📍</span>
                <div className="info-content">
                  <p className="info-label">Dirección</p>
                  <p className={`info-value ${!profile?.address ? "empty" : ""}`}>
                    {profile?.address || "Sin dirección registrada"}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* STATS CARD */}
        <div className="profile-card">
          <h2 className="profile-card-title">Mis Estadísticas</h2>

          <div className="stats-grid">
            <div className="stat-item">
              <p className="stat-number">{orders.length}</p>
              <p className="stat-label">Pedidos</p>
            </div>

            <div className="stat-item">
              <p className="stat-number">${totalSpent.toLocaleString("es-MX")}</p>
              <p className="stat-label">Total</p>
            </div>

            <div className="stat-item">
              <p className="stat-number">
                {orders.filter((o) => o.status === "delivered").length}
              </p>
              <p className="stat-label">Entregados</p>
            </div>

            <div className="stat-item">
              <p className="stat-number">
                {orders.filter((o) => o.status === "pending").length}
              </p>
              <p className="stat-label">Pendientes</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── HISTORIAL ── */}
      <div className="orders-section">
        <h2 className="orders-title">Historial de Compras</h2>

        {loadingOrders ? (
          <div className="orders-loading">Cargando pedidos...</div>
        ) : orders.length === 0 ? (
          <div className="orders-empty">Aún no has realizado ningún pedido.</div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-meta">
                  <span className="order-date">{formatDate(order.createdAt)}</span>
                  <span className="order-id">#{order._id.slice(-8).toUpperCase()}</span>
                </div>
                <span className={`order-status ${order.status}`}>
                  {STATUS_LABELS[order.status] || order.status}
                </span>
              </div>

              <div className="order-products">
                {order.products.map((item) => (
                  <div key={item._id} className="order-product-row">
                    {item.product?.image && (
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="order-product-img"
                      />
                    )}
                    <span className="order-product-name">
                      {item.product?.title || "Producto eliminado"}
                    </span>
                    <span className="order-product-qty">x{item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <span className="order-total-label">Total pagado:</span>
                <span className="order-total-value">
                  ${order.totalPrice.toLocaleString("es-MX")}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
