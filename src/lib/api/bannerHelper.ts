"use server";
import { Banner, BannerResponse } from "@/types/banner";
import { handleError } from "@/utils/handleResponseError";

export const fetchBannerByType = async (type: string): Promise<Banner[]> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/advertisement/${type}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw await handleError(response);
    }

    const data = (await response.json()) as BannerResponse;
    return data.banners;
  } catch (error: unknown) {
    console.warn(`⚠️ Failed to fetch '${type}' banners:`, error);
    return [];
  }
};
