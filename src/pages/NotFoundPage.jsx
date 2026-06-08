import BackButton from "../components/BackButton";

function NotFoundPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#fdf8f5",
        padding: "40px",
        fontFamily: "'Nunito', Arial, sans-serif",
        gap: "16px",
      }}
    >
      <p
        style={{
          fontSize: "120px",
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 700,
          color: "#c68b59",
          lineHeight: 1,
          margin: 0,
        }}
      >
        404
      </p>

      <h2
        style={{
          fontSize: "28px",
          fontFamily: "'Cormorant Garamond', serif",
          color: "#7c5e57",
          margin: 0,
        }}
      >
        Página no encontrada
      </h2>

      <p style={{ color: "#9c8176", margin: 0 }}>
        La página que buscas no existe o fue movida.
      </p>

      <div style={{ marginTop: "16px" }}>
        <BackButton />
      </div>
    </div>
  );
}

export default NotFoundPage;
