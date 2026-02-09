import { api } from "./axios/axios";

export type AdminRestaurantAddress = {
  id?: number;
  area?: string; // delivery areas
  city?: string;
  details?: string;
  fullAddress?: string;
  latitude?: number;
  longitude?: number;
  postcode?: string;
  state?: string;
  street?: string;
  typeAddress?: number;
  intercomCode?: string;
};

export type AdminRestaurant = {
  id: number;
  title: string;
  description?: string;
  category?: string;
  deliveryTime?: string;
  facilities?: string;
  isRecommended?: boolean;
  minOrderAmount?: number;
  phone?: string;
  ratings?: number;
  status?: number;
  statusDisplay?: string;
  totalRatings?: number;
  isActive?: boolean;
  imageUrl?: string;

  address?: AdminRestaurantAddress;

  createdAt?: string;
  updatedAt?: string;

  city?: string;
  fullAddress?: string;

  dishesCount?: number;
  ordersCount?: number;

  ownerName?: string;
  ownerId?: number;
};

export type AdminRestaurantCreatePayload = {
  title: string;
  description?: string;
  category?: string;
  deliveryTime?: string;
  facilities?: string;
  isRecommended?: boolean;
  minOrderAmount?: number;
  phone?: string;
  imageUrl?: string;
  address?: AdminRestaurantAddress;
  ownerId: number;
};

export type AdminRestaurantUpdatePayload = Omit<AdminRestaurantCreatePayload, "ownerId">;

export const getAdminRestaurants = async (page = 0, size = 8) => {
  const { data } = await api.get(`/admin/restaurants`, { params: { page, size } });
  return data;
};

export const getAdminRestaurantById = async (id: number) => {
  const { data } = await api.get(`/admin/restaurants/${id}`);
  return data as AdminRestaurant;
};

export const createAdminRestaurant = async (payload: AdminRestaurantCreatePayload) => {
  const { data } = await api.post(`/admin/restaurants`, payload);
  return data as AdminRestaurant;
};

export const updateAdminRestaurant = async (id: number, payload: AdminRestaurantUpdatePayload) => {
  const { data } = await api.put(`/admin/restaurants/${id}`, payload);
  return data as AdminRestaurant;
};

export const deleteAdminRestaurant = async (id: number) => {
  await api.delete(`/admin/restaurants/${id}`);
};
