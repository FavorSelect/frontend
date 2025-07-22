import { safeProductFetch } from "@/lib/api/productHelper";
import { ProductT } from "@/types/real.product";

export const getPopularProduct = () =>
  safeProductFetch<ProductT>("api/general/products", "products");

export const getCozyEveningProduct = () =>
  safeProductFetch<ProductT>(
    "api/general/products/category/lotion",
    "products"
  );

export const getRecommendationProduct = () =>
  safeProductFetch<ProductT>("api/recommendation", "recommended", true);

export const getSimilarProducts = () =>
  safeProductFetch<ProductT>(
    "api/general/products/similar/79",
    "similarProducts",
    true
  );

export const getProductByCategoriesAndBrands = async (
  queryParams: Record<string, string>
) => {
  const query = new URLSearchParams(queryParams).toString();
  const fullPath = `api/general/products?${query}`;
  return safeProductFetch(fullPath, "products", true);
};
