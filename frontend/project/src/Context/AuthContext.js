import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("crave_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = async (email, password) => {
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    setUser(data);
    localStorage.setItem("crave_user", JSON.stringify(data));
    return data;
  };

  const register = async (name, email, password) => {
    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");

    setUser(data);
    localStorage.setItem("crave_user", JSON.stringify(data));
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("crave_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;