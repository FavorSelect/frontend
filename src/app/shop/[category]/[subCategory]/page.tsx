import { getCategories } from "@/actions/getCategory";
import { getProductByCategoriesAndBrands } from "@/actions/getProduct";
import { slugify } from "@/utils/slugify";
import { notFound } from "next/navigation";
import CategoryPageWrapper from "@/components/organisms/shop/CategoryPageWrapper";
import { Subcategory } from "@/types/category";

interface ResolvedSearchParams {
  category?: string;
  subCategory?: string;
}

type SearchParams = Promise<ResolvedSearchParams>;

export default async function SubCategoryPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category: categorySlug, subCategory: subCategorySlug } =
    await searchParams;

  const categories = await getCategories();

  let realCategoryName = null;
  let realSubCategoryName = null;

  for (const cat of categories) {
    const catSlug = slugify(cat.categoryName);

    if (catSlug === categorySlug) {
      realCategoryName = cat.categoryName;

      const sub = cat.subcategories?.find(
        (subCat: Subcategory) =>
          slugify(subCat.categoryName) === subCategorySlug
      );
      if (sub) {
        realSubCategoryName = sub.categoryName;
      }
      break;
    }
  }

  if (!realCategoryName || !realSubCategoryName) {
    notFound();
  }

  const filteredProducts = await getProductByCategoriesAndBrands({
    categories: realSubCategoryName,
  });

  return <CategoryPageWrapper products={filteredProducts} />;
}
