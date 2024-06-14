import { getSessionUser } from '@/utils/getSessionUser';
import { createContext, useContext, useState } from 'react';
// Defining the User type
export type User = {
  name: string;
  role: string;
  _id: string;
  image: string;
  email?: string;
};
// Defining the props type for UserProvider component
type UserProviderProps = {
  children: React.ReactNode;
  defaultUser: User | undefined | null;
};
// Defining the state type for UserProvider component
type UserProviderState = {
  user: User | null;
  setUser: (user: User | null) => void;
};
// Initial state for UserProviderContext
const initialState: UserProviderState = {
  user: getSessionUser(),
  setUser: () => null,
};
// Creating context for UserProvider
const UserProviderContext = createContext<UserProviderState>(initialState);
// UserProvider component to provide user context to its children
export const UserProvider = ({ children }: UserProviderProps) => {
  // useState hook to manage user state, initialized with user from session storage
  const [user, setUser] = useState<User | null>(getSessionUser());
  // value object to be provided to the context
  const value = {
    user,
    setUser: (user: User | null) => {
      if (!user) {
        // If user is null, remove user from session storage
        sessionStorage.removeItem('user');
      } else {
        // Otherwise, store user in session storage
        sessionStorage.setItem('user', JSON.stringify(user));
      }
      // Update the user state
      setUser(user);
    },
  };
  // Providing the context value to children components
  return (
    <UserProviderContext.Provider value={value}>
      {children}
    </UserProviderContext.Provider>
  );
};
// Custom hook to use User context
export const useUser = () => {
  const context = useContext(UserProviderContext); // Use UserProviderContext
  if (!context)
    throw new Error('useUser must be provided within a UserProvider'); // Throw error if context is not available

  return context;
};
