import CosyEveningsProductGrid from "@/components/organisms/home/CosyEveningsProductGrid";
import Banner from "@/components/organisms/home/Banner";
import CountryProductsCarousel from "@/components/organisms/home/CountryProductsCarousel";
import HeroWrapper from "@/components/organisms/home/HeroWrapper";
import PopularProductGrid from "@/components/organisms/home/PopularProductGrid";
import TopPickProductGrid from "@/components/organisms/home/TopPickProductGrid";
import WeeklyPromotionProductsList from "@/components/organisms/home/WeeklyPromotionProductsList";
import {
  getCozyEveningProduct,
  getPopularProduct,
  getRecommendationProduct,
} from "@/actions/getProduct";
import {
  getBrandBanners,
  getHeroBanners,
  getPopularBanners,
  getProductBanners,
  getWeeklyBanners,
} from "@/actions/getBanner";

export default async function Home() {
  // all banners
  const banners = await getHeroBanners();
  const weeklyBanners = await getWeeklyBanners();
  const popularBanners = await getPopularBanners();
  const brandBanners = await getBrandBanners();
  const productBanners = await getProductBanners();

  // get products
  const popularProduct = (await getPopularProduct()).slice(0, 8);
  const cosyEveningProduct = await getCozyEveningProduct();
  const recommendationProduct = await getRecommendationProduct();

  return (
    <div className="space-y-6 xl:space-y-8">
      <HeroWrapper banners={banners} />
      <CosyEveningsProductGrid products={cosyEveningProduct} />
      <WeeklyPromotionProductsList banners={weeklyBanners} />
      <PopularProductGrid products={popularProduct} banners={popularBanners} />
      <Banner banners={brandBanners} />
      <TopPickProductGrid recommendedProducts={recommendationProduct} />
      <CountryProductsCarousel banners={productBanners} />
    </div>
  );
}
