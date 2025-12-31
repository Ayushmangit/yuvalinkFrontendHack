import { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  registerRequest,
  logoutRequest,
  meRequest,
} from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await meRequest(token)
        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();
        setUser(data.user);
        setToken(token); // persist token in context
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token"); // invalid token
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    const data = await loginRequest(email, password);
    setUser(data.user);
    setToken(data.token);
    return data;
  };

  const register = async (fullName, email, password) => {
    const data = await registerRequest(fullName, email, password);
    setUser(data.user);
    setToken(data.token);
    return data;
  };

  const logout = async () => {
    try {
      if (token) {
        await logoutRequest(token);
      }
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
