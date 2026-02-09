import { api } from "./axios/axios";

export type AdminDish = {
  id: number;
  title: string;
  description?: string;
  price: number;
  isActive: boolean;
  isDeleted?: boolean;
  sort?: number;
  imageUrl?: string;
  restaurantId: number;
  restaurantName?: string;
  dishCategoryId: number;
  categoryName?: string;
};

export type AdminDishCreatePayload = {
  title: string;
  description?: string;
  price: number;
  sort?: number;
  imageUrl?: string;
  restaurantId: number;
  dishCategoryId: number;
};

export type AdminDishListResponse = {
  content: AdminDish[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export const getAdminDishes = async (params?: {
  search?: string;
  category?: string;
  isActive?: boolean;
  page?: number;
  size?: number;
}) => {
  const { data } = await api.get(`/admin/dishes`, { params });
  return data as AdminDishListResponse;
};

export const createAdminDish = async (payload: AdminDishCreatePayload) => {
  const { data } = await api.post(`/admin/dishes`, payload);
  return data as AdminDish;
};
