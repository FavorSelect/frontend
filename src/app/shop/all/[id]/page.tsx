import { getSimilarProducts } from "@/actions/getProduct";
import ProductDetailsWrapper from "@/components/organisms/product-details/ProductDetailsWrapper";
import SimilarProductWrapper from "@/components/organisms/similar-product/SimilarProductWrapper";
import { cookies } from "next/headers";

type Params = Promise<{ id: string }>;

export default async function ProductDetails({ params }: { params: Params }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const similarProducts = await getSimilarProducts();

  return (
    <div className="space-y-6">
      <ProductDetailsWrapper id={id} token={token} />
      <SimilarProductWrapper products={similarProducts} />
    </div>
  );
}
