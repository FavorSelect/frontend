import {
  getProductByCategoriesAndBrands,
  getPopularProduct as getAllProduct,
} from "@/actions/getProduct";

import ShopPageWrapper from "@/components/organisms/shop/ShopPageWrapper";
import { colorHexMap } from "@/utils/color";

export default async function Shop({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const allProducts = await getAllProduct();
  const params = await searchParams;

  const queryParams: Record<string, string> = {};

  if (params.categories) queryParams.categories = params.categories;
  if (params.brands) queryParams.brands = params.brands;
  if (params.colors) queryParams.colors = params.colors;
  if (params.inventoryStatus)
    queryParams.inventoryStatus = params.inventoryStatus;
  if (params.maxPrice) queryParams.maxPrice = params.maxPrice;
  if (params.sortBy) queryParams.sortBy = params.sortBy;

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
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const colorMap = new Map<string, number>();
  for (const product of allProducts) {
    const colors = product.productColors ?? [];
    for (const color of colors) {
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
      priceRange={[minPrice, maxPrice]}
      colors={colorsList}
      statuses={statusesList}
    />
  );
}
