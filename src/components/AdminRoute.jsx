import { Navigate } from "react-router-dom"
import { useContext } from "react"

import { AuthContext } from "../context/auth.context"

function AdminRoute(props) {
  const { user, isLoading } =
    useContext(AuthContext)

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />
  }

  return props.children
}

export default AdminRoute