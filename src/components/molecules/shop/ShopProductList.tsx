"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getProductGridClasses } from "@/utils/getProductGridClasses";
import { ProductT } from "@/types/real.product";
import ProductCard from "../product/ProductCard";
import SkeletonProductCard from "../product/SkeletonProductCard";
import { ShoppingCart } from "lucide-react";

const ShopProductList = ({
  products,
  viewMode,
}: {
  products: ProductT[];
  viewMode: "grid" | "list";
}) => {
  const isPending = useSelector((state: RootState) => state.filterUI.isPending);

  const skeletonArray = new Array(8).fill(null);

  return (
    <>
      <div className="flex items-center gap-2 px-2 py-2 bg-gray-100 text-sm rounded font-medium">
        <ShoppingCart className="w-4 h-4 text-gray-500" />
        {products.length} product{products.length !== 1 ? "s" : ""} found
      </div>
      <div className={getProductGridClasses(viewMode)}>
        {isPending
          ? skeletonArray.map((_, index) => (
              <React.Fragment key={index}>
                <SkeletonProductCard />
              </React.Fragment>
            ))
          : products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
              />
            ))}
      </div>
    </>
  );
};

export default ShopProductList;
