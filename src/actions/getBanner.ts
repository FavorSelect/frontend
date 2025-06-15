import { getBannerUrl } from "@/utils/getApirUrl";
import { handleError } from "@/utils/handleResponseError";
import { Banner, BannerResponse } from "@/types/banner";

export const getHeroBanners = async (): Promise<Banner[]> => {
  const url = getBannerUrl("homepage-banners");

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw await handleError(response);
    }

    const responseData = (await response.json()) as BannerResponse;

    return responseData.banners;
  } catch (error: unknown) {
    console.error("Failed to fetch banners:", error);
    throw new Error(`An error occurred while fetching banners: ${error}`);
  }
};

export const getWeeklyBanners = async (): Promise<Banner[]> => {
  const url = getBannerUrl("weekly-banners");

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw await handleError(response);
    }

    const responseData = (await response.json()) as BannerResponse;

    return responseData.banners;
  } catch (error: unknown) {
    console.error("Failed to fetch banners:", error);
    throw new Error(`An error occurred while fetching banners: ${error}`);
  }
};

export const getPopularBanners = async (): Promise<Banner[]> => {
  const url = getBannerUrl("popular-banners");
  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw await handleError(response);
    }

    const responseData = (await response.json()) as BannerResponse;

    return responseData.banners;
  } catch (error: unknown) {
    console.error("Failed to fetch banners:", error);
    throw new Error(`An error occurred while fetching banners: ${error}`);
  }
};

export const getBrandBanners = async (): Promise<Banner[]> => {
  const url = getBannerUrl("brands-banners");
  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw await handleError(response);
    }

    const responseData = (await response.json()) as BannerResponse;

    return responseData.banners;
  } catch (error: unknown) {
    console.error("Failed to fetch banners:", error);
    throw new Error(`An error occurred while fetching banners: ${error}`);
  }
};

export const getProductBanners = async (): Promise<Banner[]> => {
  const url = getBannerUrl("products-banners");
  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw await handleError(response);
    }

    const responseData = (await response.json()) as BannerResponse;

    return responseData.banners;
  } catch (error: unknown) {
    console.error("Failed to fetch banners:", error);
    throw new Error(`An error occurred while fetching banners: ${error}`);
  }
};
