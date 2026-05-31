import { createContext, useEffect, useState } from "react";

import api from "../services/api";

const AuthContext = createContext();

function AuthProvider(props) {
  // USER
  const [user, setUser] = useState(null);

  // LOADING
  const [isLoading, setIsLoading] = useState(true);

  // AUTH
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // VERIFY USER
  const verifyUser = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      // NO TOKEN
      if (!storedToken) {
        setUser(null);

        setIsLoggedIn(false);

        setIsLoading(false);

        return;
      }

      // VERIFY TOKEN
      const response = await api.get("/auth/verify", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      // SAVE USER
      setUser(response.data.payload);

      // LOGGED
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);

      // REMOVE INVALID TOKEN
      localStorage.removeItem("authToken");

      setUser(null);

      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  // LOGOUT
  const logoutUser = () => {
    localStorage.removeItem("authToken");

    setUser(null);

    setIsLoggedIn(false);
  };

  // ON LOAD
  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,

        isLoading,

        isLoggedIn,

        verifyUser,

        logoutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
