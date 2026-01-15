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
  const { data } = await api.get<UserProfile>("/users/profile");
  return data;
}

export async function registerUser(
  data: RegisterPayload
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/auth/register", data);
  return response.data;
}

export interface ResetPasswordPayload {
  username: string;
  code: string;
  newPassword: string;
}
export async function resetPassword(data: ResetPasswordPayload): Promise<void> {
  await api.post("/auth/password/reset", data);
}

