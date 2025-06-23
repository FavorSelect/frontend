import { safeProductFetch } from "@/lib/api/productHelper";

export const getPopularProduct = () =>
  safeProductFetch("api/general/products", "products");

export const getCozyEveningProduct = () =>
  safeProductFetch("api/general/products/category/lotion", "products");

export const getRecommendationProduct = () =>
  safeProductFetch("api/recommendation", "recommended", true);

export const getSimilarProducts = () =>
  safeProductFetch("api/general/products/similar/79", "similarProducts", true);

export const getProductByCategoriesAndBrands = async (
  queryParams: Record<string, string>
) => {
  const query = new URLSearchParams(queryParams).toString();
  const fullPath = `api/general/products?${query}`;
  return safeProductFetch(fullPath, "products", true);
};
