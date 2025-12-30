import { api } from "./axios/axios";

export type LoginResponse = {
  user: any;
  token: string;
  refreshToken: string;
};

export async function login(username: string, password: string) {
  const { data } = await api.post<LoginResponse>("/auth/login", {
    username,
    password,
  });

  return data;
}
