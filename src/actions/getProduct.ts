"use server";
import { Product } from "@/types/Product";
import {
  getPaginatedApiUrl,
  getIdApiUrl,
  getProductApiUrl,
  getProductUrl,
} from "@/utils/getApirUrl";
import { handleError } from "@/utils/handleResponseError";
import { ProductT, ProductApiResponse } from "@/types/real.product";

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
    const response = await fetch(url);

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
    const response = await fetch(url);
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
    const response = await fetch(url);
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
      credentials: "include",
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
