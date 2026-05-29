import {
  createContext,
  useEffect,
  useState,
} from "react"

import api from "../services/api"

const AuthContext = createContext()

function AuthProvider(props) {
  const [user, setUser] = useState(null)

  const [isLoading, setIsLoading] =
    useState(true)

  const verifyUser = async () => {
    try {
      const storedToken =
        localStorage.getItem("authToken")

      if (storedToken) {
        const response = await api.get(
          "/auth/verify",
          {
            headers: {
              Authorization:
                `Bearer ${storedToken}`,
            },
          }
        )

        setUser(response.data.payload)
      }
    } catch (error) {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const logoutUser = () => {
    localStorage.removeItem("authToken")

    setUser(null)
  }

  useEffect(() => {
    verifyUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        verifyUser,
        logoutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthProvider,
}