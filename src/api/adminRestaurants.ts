import { api } from "./axios/axios";

export type RestaurantAddress = {
  id: number;
  area?: string;
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
  totalRatings?: number;

  status?: number;
  statusDisplay?: string;

  isActive?: boolean;
  imageUrl?: string;

  address?: RestaurantAddress;

  createdAt?: string;
  updatedAt?: string;

  city?: string;
  fullAddress?: string;

  dishesCount?: number;
  ordersCount?: number;

  ownerName?: string;
  ownerId?: number;
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

export async function updateAdminRestaurant(id: number, payload: Partial<AdminRestaurant>) {
  const { data } = await api.put<AdminRestaurant>(`/admin/restaurants/${id}`, payload);
  return data;
}

export async function deleteAdminRestaurant(id: number) {
  await api.delete(`/admin/restaurants/${id}`);
}
