import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import API from "../api/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDrakMode] = useState(false);

  useEffect(() => {
    const mode = localStorage.getItem("isDarkMode");
    if (mode) {
      setIsDrakMode(JSON.parse(mode));
    }

    
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }
      try {
        const { data } = await API.get("/auth/me");
        setUser(data);
      } catch (error) {
        console.error("Error verifying user:", error);
        setUser(null);
      }
    };
    verifyUser();
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const toggleDarkMode = () => {
    setIsDrakMode((prevMode) => !prevMode);
    console.log(isDarkMode);
    localStorage.setItem("isDarkMode", JSON.stringify(!isDarkMode));
  };

  const value = { login, logout, user, isDarkMode, toggleDarkMode };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
