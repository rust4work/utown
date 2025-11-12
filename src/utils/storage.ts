export const saveAuthData = (
  token: string,
  refreshToken: string,
  user: any
) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const clearAuthData = () => {
  localStorage.clear();
};
export const getToken = () => {
  return localStorage.getItem("token");
};
