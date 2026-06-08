import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import "../styles/BackButton.css";

function BackButton() {
  return (
    <Link to="/" className="back-btn">
      <Home size={15} />
      Inicio
    </Link>
  );
}

export default BackButton;
