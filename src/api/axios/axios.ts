import axios from "axios";

export const api = axios.create({
  baseURL: "https://utown-api.habsida.net/api",
  headers: {
    "Content-Type": "application/json",
  },
});

function getToken() {
  return (
    sessionStorage.getItem("token") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("accessToken") ||
    localStorage.getItem("accessToken")
  );
}

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
