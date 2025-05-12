import { API_URL } from "@/config/constants";

export const getProductApiUrl = (limit: number): string => {
  return `${API_URL}/products?limit=${limit}`;
};

export const getPaginatedApiUrl = (offset: number, limit: number): string => {
  return `${API_URL}/products?limit=${limit}&skip=${offset}`;
};

export const getIdApiUrl = (id: string): string => {
  return `${API_URL}/products/${id}`;
};
