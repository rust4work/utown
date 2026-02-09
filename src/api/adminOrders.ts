import { api } from "./axios/axios";

export type AdminOrder = {
  id: number;
  clientName?: string;
  establishmentName?: string;
  riderName?: string;
  orderNumber?: string;
  amount?: number;
  orderTime?: string;
  pickupTime?: string;
  deliveryTime?: string;
  items?: string;
  clientPhone?: string;
  establishmentPhone?: string;
  riderPhone?: string;
  restaurantId?: number;
};

export type AdminOrderListResponse = {
  content: AdminOrder[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export const getAdminOrders = async (params?: {
  page?: number;
  size?: number;
}) => {
  const { data } = await api.get(`/admin/orders`, { params });
  return data as AdminOrderListResponse;
};
