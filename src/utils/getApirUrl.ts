import { API_URL, FAVOR_SELECT_API_URL } from "@/config/constants";

export const getProductApiUrl = (limit: number): string => {
  return `${API_URL}/products?limit=${limit}`;
};

export const getPaginatedApiUrl = (offset: number, limit: number): string => {
  return `${API_URL}/products?limit=${limit}&skip=${offset}`;
};

export const getIdApiUrl = (id: string): string => {
  return `${API_URL}/products/${id}`;
};

export const getBannerUrl = (endpoint: string) => {
  return `${FAVOR_SELECT_API_URL}/api/advertisement/${endpoint}`;
};

export const getProductUrl = (endpoint: string) => {
  return `${FAVOR_SELECT_API_URL}/${endpoint}`;
};

export const getCategoryUrl = () => {
  return `${FAVOR_SELECT_API_URL}/api/general/categories-with-pro-count`;
};

export const getNotificationUrl = () => {
  return `${FAVOR_SELECT_API_URL}/api/general/notifications`;
};
