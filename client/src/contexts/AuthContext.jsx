import React, { createContext, useState, useContext } from 'react';
import { setTokens } from '../utils/tokenStorage';
import { login } from '../api/auth';
import { register } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (username, password) => {
    const { accessToken, refreshToken } = await login(username, password);
    setTokens(accessToken, refreshToken);
    setUser({ username });
  };

  const signUp = async (username, password) => {
    await register(username, password);
  };
  
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
