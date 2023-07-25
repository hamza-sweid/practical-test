export const Login = async () => {
  try {
    const response = await import('../usersCredentials.json');
    return response.users;
  } catch (err) {
    return err;
  }
};

export const logout = () => {
  localStorage.removeItem('userRole');
  localStorage.removeItem('isUserLoggedIn');
};

export const getUserRole = () => {
  return localStorage.getItem('userRole');
};

export const setUserRole = (role) => {
  localStorage.setItem('userRole', role);
};

export const getIsUserLoggedIn = () => {
  localStorage.getItem('isUserLoggedIn');
};

export const setIsUserLoggedIn = (value) => {
  localStorage.setItem('isUserLoggedIn', value);
};
