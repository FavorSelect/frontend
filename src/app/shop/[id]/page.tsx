import { getProduct, getProductById } from "@/actions/getProduct";
import ProductDetailsWrapper from "@/components/organisms/product-details/ProductDetailsWrapper";
import SimilarProductWrapper from "@/components/organisms/similar-product/SimilarProductWrapper";
import { SIMILAR_PRODUCT_PER_PAGE } from "@/config/constants";
import { Product } from "@/types/Product";

type Params = Promise<{ id: string }>;

export default async function ProductDetails({ params }: { params: Params }) {
  const { id } = await params;

  const product: Product | null = await getProductById(id);
  const similarProducts = await getProduct(SIMILAR_PRODUCT_PER_PAGE);

  // Handle product not found
  if (!product) {
    return (
      <div className="text-center py-20">
        <h1>Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProductDetailsWrapper product={product} />
      <SimilarProductWrapper products={similarProducts} />
    </div>
  );
}
