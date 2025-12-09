import axios from "axios";

export const api = axios.create({
  baseURL: "https://utown-api.habsida.net/api",
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }

  return config;
});