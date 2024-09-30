import React, { createContext, useState, useEffect } from 'react';

interface User {
  id: number;
  role: string;
  children: React.ReactNode;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;

}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export const AuthProvider: React.FC<User> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
  );
};