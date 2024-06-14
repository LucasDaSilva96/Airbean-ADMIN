import { User } from '../components/UserProvider';
// Function to get the session user from session storage
export const getSessionUser = (): User | null => {
  // Retrieve the 'user' item from session storage
  const user = sessionStorage.getItem('user');
  // Check if a user exists in session storage
  if (user) {
    // If a user exists, parse the JSON string back into an object and return it
    return JSON.parse(user);
  } else {
    // If no user exists, return null
    return null;
  }
};
