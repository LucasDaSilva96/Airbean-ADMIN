import { getSessionUser } from '@/utils/getSessionUser';
import { createContext, useContext, useState } from 'react';

type User = {
  name: string;
  role: string;
  _id: string;
  image: string;
};

type UserProviderProps = {
  children: React.ReactNode;
  defaultUser: User | undefined | null;
};

type UserProviderState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const initialState: UserProviderState = {
  user: getSessionUser(),
  setUser: () => null,
};

const UserProviderContext = createContext<UserProviderState>(initialState);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(getSessionUser());

  const value = {
    user,
    setUser: (user: User | null) => {
      if (!user) {
        sessionStorage.removeItem('user');
      } else {
        sessionStorage.setItem('user', JSON.stringify(user));
      }
      setUser(user);
    },
  };

  return (
    <UserProviderContext.Provider value={value}>
      {children}
    </UserProviderContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserProviderContext);
  if (!context)
    throw new Error('useUser must be provided within a UserProvider');

  return context;
};
