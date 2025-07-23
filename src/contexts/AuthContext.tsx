import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('movieapp_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('movieapp_users') || '[]');
    const foundUser = users.find((u: User & { password: string }) => 
      u.email === email && u.password === password
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('movieapp_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('movieapp_users') || '[]');
    
    if (users.find((u: User) => u.email === email)) {
      return false; // User already exists
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      watchlist: [],
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('movieapp_users', JSON.stringify(users));
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('movieapp_user', JSON.stringify(userWithoutPassword));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('movieapp_user');
  };

  const addToWatchlist = (movieId: number) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      watchlist: [...user.watchlist, movieId]
    };
    
    setUser(updatedUser);
    localStorage.setItem('movieapp_user', JSON.stringify(updatedUser));
    updateUserInStorage(updatedUser);
  };

  const removeFromWatchlist = (movieId: number) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      watchlist: user.watchlist.filter(id => id !== movieId)
    };
    
    setUser(updatedUser);
    localStorage.setItem('movieapp_user', JSON.stringify(updatedUser));
    updateUserInStorage(updatedUser);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('movieapp_user', JSON.stringify(updatedUser));
    updateUserInStorage(updatedUser);
  };

  const deleteAccount = async (password: string): Promise<boolean> => {
    if (!user) return false;
    
    const users = JSON.parse(localStorage.getItem('movieapp_users') || '[]');
    const userWithPassword = users.find((u: User & { password: string }) => u.id === user.id);
    
    if (userWithPassword && userWithPassword.password === password) {
      const updatedUsers = users.filter((u: User) => u.id !== user.id);
      localStorage.setItem('movieapp_users', JSON.stringify(updatedUsers));
      logout();
      return true;
    }
    return false;
  };

  const updateUserInStorage = (updatedUser: User) => {
    const users = JSON.parse(localStorage.getItem('movieapp_users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === updatedUser.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedUser };
      localStorage.setItem('movieapp_users', JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      addToWatchlist,
      removeFromWatchlist,
      updateProfile,
      deleteAccount
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};