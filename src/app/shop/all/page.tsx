import { getCategories } from "@/actions/getCategory";
import {
  getProductByCategoriesAndBrands,
  getPopularProduct as getAllProduct,
} from "@/actions/getProduct";
import ShopPageWrapper from "@/components/organisms/shop/ShopPageWrapper";
import { transformCategoriesToCarouselData } from "@/utils/categoryHelpers";
import { colorHexMap } from "@/utils/color";

interface ResolvedSearchParams {
  categories?: string;
  brands?: string;
  colors?: string;
  inventoryStatus?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
}

type SearchParams = Promise<ResolvedSearchParams>;

export default async function Shop({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const allProducts = await getAllProduct();
  const cate = await getCategories();
  const categoryCarouselData = transformCategoriesToCarouselData(cate);

  const {
    categories,
    brands,
    colors,
    inventoryStatus,
    minPrice,
    maxPrice,
    sortBy,
  } = await searchParams;

  const queryParams: Record<string, string> = {};

  if (categories) queryParams.categories = categories;
  if (brands) queryParams.brands = brands;
  if (colors) queryParams.colors = colors;
  if (inventoryStatus) queryParams.inventoryStatus = inventoryStatus;
  if (maxPrice) queryParams.maxPrice = maxPrice;
  if (minPrice) queryParams.minPrice = minPrice;
  if (sortBy) queryParams.sortBy = sortBy;

  const filteredProducts =
    Object.keys(queryParams).length > 0
      ? await getProductByCategoriesAndBrands(queryParams)
      : allProducts;

  const categorySet = new Set(
    allProducts.map((p) => p.category?.categoryName).filter(Boolean)
  );
  const categoriesList = Array.from(categorySet);

  const brandMap = new Map<string, number>();
  for (const product of allProducts) {
    const brand = product.productBrand;
    if (brand) {
      brandMap.set(brand, (brandMap.get(brand) || 0) + 1);
    }
  }
  const brandsList = Array.from(brandMap, ([name, count]) => ({ name, count }));

  const prices = allProducts.map((p) => p.productPrice);
  const minPriceVal = Math.min(...prices);
  const maxPriceVal = Math.max(...prices);

  const colorMap = new Map<string, number>();
  for (const product of allProducts) {
    const productColors = product.productColors?.split(" ") ?? [];
    for (const color of productColors) {
      colorMap.set(color, (colorMap.get(color) || 0) + 1);
    }
  }

  const colorsList = Array.from(colorMap, ([name, count]) => ({
    name,
    count,
    hex: colorHexMap[name] ?? "#cccccc",
  }));

  const statusMap = new Map<string, number>();
  for (const product of allProducts) {
    const status = product.inventoryStatus;
    if (status) {
      statusMap.set(status, (statusMap.get(status) || 0) + 1);
    }
  }
  const statusesList = Array.from(statusMap, ([name, count]) => ({
    name,
    count,
  }));

  return (
    <ShopPageWrapper
      products={filteredProducts}
      categories={categoriesList}
      brands={brandsList}
      priceRange={[minPriceVal, maxPriceVal]}
      colors={colorsList}
      statuses={statusesList}
      categoryCarouselData={categoryCarouselData}
    />
  );
}
