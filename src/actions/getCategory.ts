/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCategoryUrl } from "@/utils/getApirUrl";
import { handleError } from "@/utils/handleResponseError";

export const getCategories = async (): Promise<any[]> => {
  const url = getCategoryUrl();
  try {
    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw await handleError(response);
    }

    const responseData = (await response.json()) as any;

    return responseData.categories;
  } catch (error: unknown) {
    console.error("Failed to fetch banners:", error);
    throw new Error(`An error occurred while fetching banners: ${error}`);
  }
};
