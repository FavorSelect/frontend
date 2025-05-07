"use server";
import { Product } from "@/types/Product";
import { getPaginatedApiUrl, getProductApiUrl } from "@/utils/getApirUrl";
import { handleError } from "@/utils/handleResponseError";

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
