import { categoryIconMap } from "@/utils/iconMaps";
import type { Category } from "@/types/category";

export type CategoryCarouselItem = {
  icon: string;
  name: string;
  count: number;
};

export const transformCategoriesToCarouselData = (
  categories: Category[]
): CategoryCarouselItem[] => {
  return categories.map((category) => ({
    icon: categoryIconMap[category.categoryName] ?? "icons/006-test-tube.svg",
    name: category.categoryName,
    count: category.categoryProductCount,
  }));
};
