// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getTokenFromLocalStorage, saveTokenToLocalStorage, removeTokenFromLocalStorage } from '../utils/authHelpers';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getTokenFromLocalStorage());

  const login = (authToken) => {
    setToken(authToken);
    saveTokenToLocalStorage(authToken);
  };

  const logout = () => {
    setToken(null);
    removeTokenFromLocalStorage();
  };

  useEffect(() => {
    const savedToken = getTokenFromLocalStorage();
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
