import { User } from '../components/UserProvider';
// Function to set the session user in session storage

export const setSessionUser = (user: User) => {
  // Check if a user object is provided
  if (user) {
    // If a user object exists, convert it to a JSON string and store it in session storage
    sessionStorage.setItem('user', JSON.stringify(user));
  }
};
