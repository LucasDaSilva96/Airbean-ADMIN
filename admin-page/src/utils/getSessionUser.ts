import { User } from '../components/UserProvider';
export const getSessionUser = (): User | null => {
  const user = sessionStorage.getItem('user');

  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
};
