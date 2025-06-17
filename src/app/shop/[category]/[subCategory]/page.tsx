import { getCategories } from "@/actions/getCategory";
import { getProductByCategoriesAndBrands } from "@/actions/getProduct";
import { slugify } from "@/utils/slugify";
import { notFound } from "next/navigation";
import CategoryPageWrapper from "@/components/organisms/shop/CategoryPageWrapper";
import { Subcategory } from "@/types/category";

export default async function SubCategoryPage({
  params,
}: {
  params: { category: string; subCategory: string };
}) {
  const { category: categorySlug, subCategory: subCategorySlug } = await params;

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
