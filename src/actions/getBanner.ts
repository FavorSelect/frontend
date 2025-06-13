import {
  getBannerUrl,
  getBrandBannerUrl,
  getPopularBannerUrl,
  getProductBannerUrl,
  getWeeklyBannerUrl,
} from "@/utils/getApirUrl";
import { handleError } from "@/utils/handleResponseError";
import { Banner, BannerResponse } from "@/types/banner";

export const getHeroBanners = async (): Promise<Banner[]> => {
  const url = getBannerUrl();

  try {
    const response = await fetch(url, {
      cache: "no-store",
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
  const url = getWeeklyBannerUrl();

  try {
    const response = await fetch(url, {
      cache: "no-store",
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
  const url = getPopularBannerUrl();
  try {
    const response = await fetch(url, {
      cache: "no-store",
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
  const url = getBrandBannerUrl();
  try {
    const response = await fetch(url, {
      cache: "no-store",
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
  const url = getProductBannerUrl();
  try {
    const response = await fetch(url, {
      cache: "no-store",
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
