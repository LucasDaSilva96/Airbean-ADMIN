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
  setUser: (user: User) => void;
};

const initialState: UserProviderState = {
  user: null,
  setUser: () => null,
};

const UserProviderContext = createContext<UserProviderState>(initialState);

export const UserProvider = ({ children, defaultUser }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(
    defaultUser ? defaultUser : null
  );

  const value = {
    user,
    setUser: (user: User) => {
      sessionStorage.setItem('user', JSON.stringify(user));
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
