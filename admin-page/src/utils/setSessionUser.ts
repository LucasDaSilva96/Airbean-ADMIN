import { User } from '../components/UserProvider';

export const setSessionUser = (user: User) => {
  if (user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }
};
