import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await api.get("/auth/me");
        if (response.data.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      setUser(response.data.user);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data?.msg);
      throw new Error(error.response?.data?.msg || "Login failed");
    }
  };

  const signup = async (fullName, email, password) => {
    try {
      const response = await api.post("/auth/signup", { fullName, email, password });
      setUser(response.data.user);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.msg);
      throw new Error(error.response?.data?.msg || "Signup failed");
    }
  };

  const loginWithGoogle = async (credential, profile) => {
    try {
      const response = await api.post("/auth/google", { credential, profile });
      setUser(response.data.user);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Login failed:", error);
      throw new Error("Google Login failed");
    }
  };

  const fetchMe = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (err) {
      console.log("Auth refresh error", err);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  const authContextValue = {
    user,
    setUser,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    loginWithGoogle,
    fetchMe
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;