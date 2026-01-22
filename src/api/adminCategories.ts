import { api } from "./axios/axios";

export type AdminCategory = {
  id: number;
  name: string;
  sort?: number;
  imageUrl?: string;
  isActive?: boolean;
  isDeleted?: boolean;
};

export type AdminCategoryListResponse = {
  content: AdminCategory[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export const getAdminCategories = async (params?: {
  search?: string;
  page?: number;
  size?: number;
}) => {
  const { data } = await api.get(`/admin/categories`, { params });
  return data as AdminCategoryListResponse;
};

export const createAdminCategory = async (payload: {
  name: string;
  sort?: number;
  imageUrl?: string;
}) => {
  const { data } = await api.post(`/admin/categories`, payload);
  return data as AdminCategory;
};
