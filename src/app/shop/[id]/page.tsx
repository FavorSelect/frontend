import { getProduct, getProductById } from "@/actions/getProduct";
import ProductDetailsWrapper from "@/components/organisms/product-details/ProductDetailsWrapper";
import SimilarProductWrapper from "@/components/organisms/similar-product/SimilarProductWrapper";
import { SIMILAR_PRODUCT_PER_PAGE } from "@/config/constants";

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const product = await getProductById(id);
  const similarProducts = await getProduct(SIMILAR_PRODUCT_PER_PAGE);

  return (
    <div className="space-y-6">
      <ProductDetailsWrapper product={product} />

      <SimilarProductWrapper products={similarProducts} />
    </div>
  );
}
