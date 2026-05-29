import { Navigate } from "react-router-dom"
import { useContext } from "react"

import { AuthContext } from "../context/auth.context"

function PrivateRoute(props) {
  const { user, isLoading } =
    useContext(AuthContext)

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return props.children
}

export default PrivateRoute