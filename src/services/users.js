export const getUsers = async () => {
  try {
    const response = await import('../users.json');
    return response.users;
  } catch (err) {
    return err;
  }
};
