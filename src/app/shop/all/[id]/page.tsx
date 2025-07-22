import { getSimilarProducts } from "@/actions/getProduct";
import { getProductDetails } from "@/actions/getProductDetails";
import ProductDetailsWrapper from "@/components/organisms/product-details/ProductDetailsWrapper";
import SimilarProductWrapper from "@/components/organisms/similar-product/SimilarProductWrapper";
import { cookies } from "next/headers";

type Params = Promise<{ id: string }>;

export default async function ProductDetails({ params }: { params: Params }) {
  const { id } = await params;
  const productDetails = await getProductDetails(id);
  const similarProducts = await getSimilarProducts();
  const cookieStore = await cookies();
  const token = cookieStore.get("token_middleware")?.value;

  if (!productDetails) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="space-y-6">
      <ProductDetailsWrapper product={productDetails} token={token} />
      <SimilarProductWrapper products={similarProducts} />
    </div>
  );
}
