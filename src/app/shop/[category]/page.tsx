import { getCategories } from "@/actions/getCategory";
import { getProductByCategoriesAndBrands } from "@/actions/getProduct";
import CategoryPageWrapper from "@/components/organisms/shop/CategoryPageWrapper";
import { slugify } from "@/utils/slugify";
import { notFound } from "next/navigation";

interface ResolvedSearchParams {
  category: string;
}
type SearchParams = Promise<ResolvedSearchParams>;

export default async function CategoryPage({
  params,
}: {
  params: SearchParams;
}) {
  const { category } = await params;

  const categories = await getCategories();

  const slugToCategoryNameMap = new Map<string, string>();
  for (const cat of categories) {
    const slug = slugify(cat.categoryName);
    slugToCategoryNameMap.set(slug, cat.categoryName);
  }

  const slug = category;
  const realCategoryName = slugToCategoryNameMap.get(slug);

  if (!realCategoryName) {
    notFound();
  }

  const filteredProducts = await getProductByCategoriesAndBrands({
    categories: realCategoryName,
  });

  return <CategoryPageWrapper products={filteredProducts} />;
}
