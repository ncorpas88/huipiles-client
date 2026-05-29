import { Link } from "react-router-dom"
import { useContext } from "react"

import { AuthContext } from "../context/auth.context"

function Navbar() {
  const { user, logoutUser } =
    useContext(AuthContext)

  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <Link
        to="/"
        className="text-2xl font-bold"
      >
        SICARU
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/products">
          Productos
        </Link>

        {user ? (
          <>
            <Link to="/profile">
              Perfil
            </Link>

            <Link to="/cart">
              Carrito
            </Link>

            {user.role === "admin" && (
              <Link to="/admin">
                Admin
              </Link>
            )}

            <button
              onClick={logoutUser}
              className="bg-black text-white px-3 py-1"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar