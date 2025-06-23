import { fetchBannerByType } from "@/lib/api/bannerHelper";

export const getHeroBanners = () => fetchBannerByType("homepage-banners");
export const getWeeklyBanners = () => fetchBannerByType("weekly-banners");
export const getPopularBanners = () => fetchBannerByType("popular-banners");
export const getBrandBanners = () => fetchBannerByType("brands-banners");
export const getProductBanners = () => fetchBannerByType("products-banners");
