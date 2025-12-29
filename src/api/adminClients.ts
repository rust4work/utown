import { api } from "./axios/axios";

export type AdminClient = {
  id: number;
  fullName: string;
  username: string; // phone
  email: string;
  role: "CLIENT";
  isActive: boolean;
  avatarUrl?: string;
  city?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateAdminClientDto = {
  fullName?: string;
  username?: string;
  email?: string;
  city?: string;
  address?: string;
  avatarUrl?: string;
};

export type PageResponse<T> = {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
  content: T[];
};

export type CreateAdminClientPayload = {
  fullName: string;
  username: string; // phone
  email: string;
  city?: string;
  address?: string;
  avatarUrl?: string; 
};

export type UpdateAdminClientPayload = Partial<CreateAdminClientPayload>;

// LIST (pageable)
export async function getAdminClients(page: number, size: number) {
  const { data } = await api.get<PageResponse<AdminClient>>("/admin/clients", {
    params: { page, size },
  });
  return data;
}

// CREATE
export async function createAdminClient(payload: CreateAdminClientPayload) {
  const { data } = await api.post<AdminClient>("/admin/clients", payload);
  return data;
}

// DETAILS
export async function getAdminClientById(id: number) {
  const { data } = await api.get<AdminClient>(`/admin/clients/${id}`);
  return data;
}

// UPDATE
export async function updateAdminClient(id: number, payload: UpdateAdminClientPayload) {
  const { data } = await api.put<AdminClient>(`/admin/clients/${id}`, payload);
  return data;
}

// DELETE
export async function deleteAdminClient(id: number) {
  await api.delete(`/admin/clients/${id}`);
}

// BLOCK / UNBLOCK
export async function blockAdminClient(id: number) {
  await api.patch(`/admin/clients/${id}/block`);
}

export async function unblockAdminClient(id: number) {
  await api.patch(`/admin/clients/${id}/unblock`);
}
