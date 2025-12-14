import { api } from "./axios/axios";

export interface RegisterPayload {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "CLIENT";
}

export interface UserProfile {
  id: number;
  username: string;
  fullName: string;
  isActive: boolean;
  defaultAddress: number;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RegisterResponse {
  token: string;
  refreshToken: string;
  user: {
    id: number;
    username: string;
    fullName: string;
    isActive: boolean;
    defaultAddress: number;
    roles: string[];
    createdAt: string;
    updatedAt: string;
  };
}

export async function fetchUserProfile(): Promise<UserProfile> {
  const response = await api.get<UserProfile>("/users/profile");
  return response.data;
}

export async function registerUser(
  data: RegisterPayload
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/auth/register", data);
  return response.data;
}