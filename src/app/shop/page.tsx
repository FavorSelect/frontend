import React from "react";
import ShopPageWrapper from "@/components/organisms/shop/ShopPageWrapper";
import { getPaginatedProduct } from "@/actions/getProduct";
import { PAGINATED_PRODUCT_SHOP_PER_PAGE } from "@/config/constants";

export default async function Shop() {
  const initialProduct = await getPaginatedProduct(
    0,
    PAGINATED_PRODUCT_SHOP_PER_PAGE
  );
  return (
    <div className="space-y-6 xl:space-y-8">
      <ShopPageWrapper initialProducts={initialProduct} />
    </div>
  );
}
