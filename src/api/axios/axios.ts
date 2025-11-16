import axios from "axios";

export const api = axios.create({
  baseURL: "https://utown-api.habsida.net/api",
  withCredentials: true,
});
