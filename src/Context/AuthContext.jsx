"use client"

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt_token");
    if (storedToken) {
      setToken(storedToken);
      try {
        const payload = JSON.parse(atob(storedToken.split(".")[1]));
        setUser({ name: payload.sub });
      } catch (e) {
        localStorage.removeItem("jwt_token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const res = await fetch(`http://localhost:5005/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);

      const newToken = data.access_token;
      localStorage.setItem("jwt_token", newToken);
      setToken(newToken);
      
      const payload = JSON.parse(atob(newToken.split(".")[1]));
      setUser({ name: payload.sub });
      
      navigate("/"); // Redirect to dashboard/home
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };
  
  // --- THIS IS THE MISSING FUNCTION ---
  const register = async (username, password) => {
    try {
      const res = await fetch(`http://localhost:5005/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        // This will catch errors like "Username already exists" from your API
        throw new Error(data.msg);
      }
      // On success, we just return true. We don't log the user in automatically.
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt_token");
    setUser(null);
    setToken(null);
    navigate("/login"); 
  };
  
  // --- IT MUST BE INCLUDED IN THE VALUE OBJECT HERE ---
  const value = { user, token, loading, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
