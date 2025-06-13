import CosyEveningsProductGrid from "@/components/organisms/home/CosyEveningsProductGrid";
import Banner from "@/components/organisms/home/Banner";
import CountryProductsCarousel from "@/components/organisms/home/CountryProductsCarousel";
import HeroWrapper from "@/components/organisms/home/HeroWrapper";
import PopularProductGrid from "@/components/organisms/home/PopularProductGrid";
import TopPickProductGrid from "@/components/organisms/home/TopPickProductGrid";
import WeeklyPromotionProductsList from "@/components/organisms/home/WeeklyPromotionProductsList";
import { getPaginatedProduct, getProduct } from "@/actions/getProduct";
import {
  COSY_EVENING_PRODUCT_PER_PAGE,
  PAGINATED_PRODUCT_PER_PAGE,
  POPULAR_PRODUCT_PER_PAGE,
} from "@/config/constants";
import {
  getBrandBanners,
  getHeroBanners,
  getPopularBanners,
  getProductBanners,
  getWeeklyBanners,
} from "@/actions/getBanner";

export default async function Home() {
  const cosyEveningProduct = await getProduct(COSY_EVENING_PRODUCT_PER_PAGE);
  const popularProducts = await getProduct(POPULAR_PRODUCT_PER_PAGE);
  const initialProduct = await getPaginatedProduct(
    0,
    PAGINATED_PRODUCT_PER_PAGE
  );

  // all banners
  const banners = await getHeroBanners();
  const weeklyBanners = await getWeeklyBanners();
  const popularBanners = await getPopularBanners();
  const brandBanners = await getBrandBanners();
  const productBanners = await getProductBanners();

  return (
    <div className="space-y-6 xl:space-y-8">
      <HeroWrapper banners={banners} />
      <CosyEveningsProductGrid products={cosyEveningProduct} />
      <WeeklyPromotionProductsList banners={weeklyBanners} />
      <PopularProductGrid products={popularProducts} banners={popularBanners} />
      <Banner banners={brandBanners} />
      <TopPickProductGrid initialProducts={initialProduct} />
      <CountryProductsCarousel banners={productBanners} />
    </div>
  );
}
