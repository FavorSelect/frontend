import { getProduct } from "@/actions/getProduct";
import ProductDescriptionWrapper from "@/components/organisms/product-details/ProductDescriptionWrapper";
import ProductDetailsWrapper from "@/components/organisms/product-details/ProductDetailsWrapper";
import ProductReviewWrapper from "@/components/organisms/product-details/ProductReviewWrapper";
import SimilarProductWrapper from "@/components/organisms/similar-product/SimilarProductWrapper";
import { SIMILAR_PRODUCT_PER_PAGE } from "@/config/constants";

export default async function ProductDetails() {
  const similarProducts = await getProduct(SIMILAR_PRODUCT_PER_PAGE);
  return (
    <div className="space-y-6">
      <ProductDetailsWrapper />
      <ProductDescriptionWrapper />
      <ProductReviewWrapper />
      <SimilarProductWrapper products={similarProducts} />
    </div>
  );
}
