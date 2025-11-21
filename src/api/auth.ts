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
    id: 0;
    username: string;
    fullName: string;
    isActive: boolean;
    defaultAddress: number;
    roles: [string];
    createdAt: string;
    updatedAt: string;
  };
}

const API_URL = "/api/auth";

export async function registerUser(
  data: RegisterPayload
): Promise<RegisterResponse> {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.error("SERVER RESPONSE:", await response.text());
    throw new Error("Registration failed");
  }

  return response.json();
}
