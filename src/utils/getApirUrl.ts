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

export const getBannerUrl = () => {
  return `${FAVOR_SELECT_API_URL}/api/advertisement/homepage-banners`;
};

export const getWeeklyBannerUrl = () => {
  return `${FAVOR_SELECT_API_URL}/api/advertisement/weekly-banners`;
};

export const getPopularBannerUrl = () => {
  return `${FAVOR_SELECT_API_URL}/api/advertisement/popular-banners`;
};

export const getBrandBannerUrl = () => {
  return `${FAVOR_SELECT_API_URL}/api/advertisement/brands-banners`;
};
export const getProductBannerUrl = () => {
  return `${FAVOR_SELECT_API_URL}/api/advertisement/products-banners`;
};
