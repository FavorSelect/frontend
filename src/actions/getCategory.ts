"use server";

import { Category, CategoryResponse } from "@/types/category";
import { getCategoryUrl } from "@/utils/getApirUrl";
import { handleError } from "@/utils/handleResponseError";

export const getCategories = async (): Promise<Category[]> => {
  const url = getCategoryUrl();

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw await handleError(response);
    }

    const responseData = (await response.json()) as CategoryResponse;

    return responseData.categories;
  } catch (error: unknown) {
    console.warn("⚠️ Skipping category fetch during build:", error);

    return [];
  }
};
