import { api } from "./axios/axios";

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

export type AdminRestaurant = {
  id: number;
  title: string;
  phone: string;
  city?: string;
  fullAddress?: string;
  ordersCount?: number;

  address?: {
    city?: string;
    fullAddress?: string;
  };

  dishesCount?: number;
  imageUrl?: string;
  ownerName?: string;
  ownerId?: number;
  isActive?: boolean;
};

export async function getAdminRestaurants(page: number, size: number) {
  const { data } = await api.get<PageResponse<AdminRestaurant>>("/admin/restaurants", {
    params: { page, size },
  });
  return data;
}

export async function getAdminRestaurantById(id: number) {
  const { data } = await api.get<AdminRestaurant>(`/admin/restaurants/${id}`);
  return data;
}