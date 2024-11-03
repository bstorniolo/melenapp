// src/context/UserContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import useSWR from 'swr';
import axios from '../api/api';

interface User {
  id: string;
  name: string;
  favorites: string[];
  completed: string[];
  todos: string[];
}

interface UserContextType {
  user: User | null;
  mutateUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface UserProviderProps {
  userId?: string; // Make userId optional
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ userId, children }) => {
  const { data, error, mutate } = useSWR<User>(userId ? `/users/${userId}` : null, fetcher);

  // If no userId is provided, return null for user context
  if (!userId) {
    return (
      <UserContext.Provider value={{ user: null, mutateUser: () => {} }}>
        {children}
      </UserContext.Provider>
    );
  }

  if (error) return <div>Error loading user data.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <UserContext.Provider value={{ user: data, mutateUser: mutate }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};