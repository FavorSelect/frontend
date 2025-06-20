"use server";
import { Product } from "@/types/Product";
import {
  getPaginatedApiUrl,
  getIdApiUrl,
  getProductApiUrl,
  getProductUrl,
} from "@/utils/getApirUrl";
import { handleError } from "@/utils/handleResponseError";
import {
  ProductT,
  ProductApiResponse,
  RecommendationApiResponse,
  SimilarProductsApiResponse,
} from "@/types/real.product";

// fake backend api
interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const getProduct = async (limit: number): Promise<Product[]> => {
  const url = getProductApiUrl(limit);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw await handleError(response);
    }

    const responseData = (await response.json()) as ApiResponse;
    return responseData.products;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`An error occurred: ${error}`);
  }
};

export const getPaginatedProduct = async (
  offset: number,
  limit: number
): Promise<Product[]> => {
  const url = getPaginatedApiUrl(offset, limit);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw await handleError(response);
    }

    const responseData = (await response.json()) as ApiResponse;
    return responseData.products;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`An error occurred: ${error}`);
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  const url = getIdApiUrl(id);

  try {
    const response = await fetch(url, {});

    if (!response.ok) {
      throw await handleError(response);
    }

    const responseData = (await response.json()) as Product;
    return responseData;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`An error occurred: ${error}`);
  }
};

// favor select backend api
export const getPopularProduct = async (): Promise<ProductT[]> => {
  const url = getProductUrl("api/general/products");

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      throw await handleError(response);
    }

    const responseData = (await response.json()) as ProductApiResponse;
    return responseData.products;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`An error occurred: ${error}`);
  }
};

export const getCozyEveningProduct = async (): Promise<ProductT[]> => {
  const url = getProductUrl("api/general/products/category/lotion");

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      throw await handleError(response);
    }

    const responseData = (await response.json()) as ProductApiResponse;
    return responseData.products;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`An error occurred: ${error}`);
  }
};

export const getRecommendationProduct = async (): Promise<ProductT[]> => {
  const url = getProductUrl("api/recommendation");

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
      credentials: "include",
    });
    if (!response.ok) {
      throw await handleError(response);
    }

    const responseData = (await response.json()) as RecommendationApiResponse;
    return responseData.recommended;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`An error occurred: ${error}`);
  }
};

export const getProductByCategoriesAndBrands = async (
  queryParams: Record<string, string>
): Promise<ProductT[]> => {
  const query = new URLSearchParams(queryParams).toString();
  const url = getProductUrl(`api/general/products?${query}`);

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
      credentials: "include",
    });
    if (!response.ok) throw await handleError(response);
    const responseData = (await response.json()) as ProductApiResponse;
    return responseData.products;
  } catch (error) {
    console.error(error);
    throw new Error(`An error occurred: ${error}`);
  }
};

export const getSimilarProducts = async (): Promise<ProductT[]> => {
  const url = getProductUrl("api/general/products/similar/79");

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
      credentials: "include",
    });

    if (!response.ok) {
      throw await handleError(response);
    }

    const responseData = (await response.json()) as SimilarProductsApiResponse;
    return responseData.similarProducts;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`An error occurred: ${error}`);
  }
};
