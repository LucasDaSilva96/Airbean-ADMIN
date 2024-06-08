type User = {
  name: string;
  role: string;
  _id: string;
  image: string;
};

export const getSessionUser = (): User | null => {
  const user = sessionStorage.getItem('user');

  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
};
