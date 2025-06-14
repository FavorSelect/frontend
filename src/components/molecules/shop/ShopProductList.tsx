"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getProductGridClasses } from "@/utils/getProductGridClasses";
import { ProductT } from "@/types/real.product";
import PopularProductCard from "../product/PopularProductCard";
import SkeletonProductCard from "../product/SkeletonProductCard";

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
    <div className={getProductGridClasses(viewMode)}>
      {isPending
        ? skeletonArray.map((_, index) => (
            <React.Fragment key={index}>
              <SkeletonProductCard />
            </React.Fragment>
          ))
        : products.map((product) => (
            <PopularProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
            />
          ))}
    </div>
  );
};

export default ShopProductList;
