type User = {
  name: string;
  role: string;
  _id: string;
  image: string;
};

export const setSessionUser = (user: User) => {
  if (user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }
};
