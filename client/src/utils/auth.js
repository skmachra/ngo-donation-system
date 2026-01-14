const isBrowser = typeof window !== "undefined";
export const setToken = (token) => {
  if (isBrowser) localStorage.setItem("token", token);
};

export const getToken = () => {
  if (isBrowser) return localStorage.getItem("token");
  return null;
};

export const setRole = (role) => {
  if (isBrowser) localStorage.setItem("role", role);
}
export const getRole = () => {
  if (isBrowser) return localStorage.getItem("role");
  return null;
}

export const logout = () => {
  localStorage.removeItem("token");
};

export const isLoggedIn = () => {
  return !!getToken();
};
