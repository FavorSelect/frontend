import { FAVOR_SELECT_API_URL } from "@/config/constants";

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
