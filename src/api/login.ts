import { api } from "./axios/axios";

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken?: string;
  refreshToken?: string;
  token?: string;
};

export function login(payload: LoginRequest) {
  return api.post<LoginResponse>("/auth/login", payload);
}
