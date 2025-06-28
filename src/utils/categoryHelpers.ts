import { categoryIconMap } from "@/utils/iconMaps";
import type { Category } from "@/types/category";
import { toPascalCase } from "./toPascal";
import { slugify } from "./slugify";

export type CategoryCarouselItem = {
  icon: string;
  name: string;
  count: number;
  productByCategory: string;
};

export const transformCategoriesToCarouselData = (
  categories: Category[]
): CategoryCarouselItem[] => {
  return categories.map((category) => ({
    icon:
      categoryIconMap[toPascalCase(category.categoryName)] ??
      "/category-image/electronics.jpg",
    name: category.categoryName,
    count: category.categoryProductCount,
    productByCategory: slugify(category.categoryName),
  }));
};
