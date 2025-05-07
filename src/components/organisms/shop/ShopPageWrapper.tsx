"use client";
import { getPaginatedProduct } from "@/actions/getProduct";
import { Button } from "@/components/atoms/Button";
import Paragraph from "@/components/atoms/Paragraph";
import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ProductDisplayCard from "@/components/molecules/product/ProductDisplayCard";
import BrandFilter from "@/components/molecules/shop/BrandFilter";
import CategoryCarousel from "@/components/molecules/shop/CategoryCarousel";
import ColorFilter from "@/components/molecules/shop/ColorFilter";
import ProductCategoryFilter from "@/components/molecules/shop/ProductCategoryFilter";
import ProductPriceRangeFilter from "@/components/molecules/shop/ProductPriceRangeFilter";
import ProductStatusFilter from "@/components/molecules/shop/ProductStatusFilter";
import ShopToolbar from "@/components/molecules/shop/ShopToolBar";
import { PAGINATED_PRODUCT_PER_PAGE } from "@/config/constants";
import { useInfiniteProducts } from "@/hooks/useInfiniteProducts";
import { RootState } from "@/store/store";
import { Product } from "@/types/Product";
import React, { useState } from "react";
import { useSelector } from "react-redux";

type ShopPageProductListProps = {
  initialProducts: Product[];
};

const fakeCategories = [
  { icon: "/icons/007-pills.svg", name: "Medicine", count: 20 },
  { icon: "/icons/016-notepad.svg", name: "Nutrition", count: 11 },
  { icon: "/icons/006-nose.svg", name: "Cough, Cold, Fever", count: 5 },
  { icon: "/icons/030-pills.svg", name: "Dietary", count: 7 },
  { icon: "/icons/004-cream.svg", name: "Cosmetics", count: 6 },
  { icon: "/icons/023-briefcase.svg", name: "Health", count: 27 },
  { icon: "/icons/008-liposuction.svg", name: "Protection", count: 24 },
  { icon: "/icons/013-syringe.svg", name: "Medication", count: 7 },
  { icon: "/icons/027-brush.svg", name: "Mouth & Teeth", count: 1 },
  { icon: "/icons/006-test-tube.svg", name: "Allergies", count: 14 },
  { icon: "/icons/007-pills.svg", name: "Medicine", count: 20 },
  { icon: "/icons/016-notepad.svg", name: "Nutrition", count: 11 },
  { icon: "/icons/006-nose.svg", name: "Cough, Cold, Fever", count: 5 },
  { icon: "/icons/030-pills.svg", name: "Dietary", count: 7 },
  { icon: "/icons/030-pills.svg", name: "Dietary", count: 7 },
  { icon: "/icons/030-pills.svg", name: "Dietary", count: 7 },
  { icon: "/icons/030-pills.svg", name: "Dietary", count: 7 },
  { icon: "/icons/030-pills.svg", name: "Dietary", count: 7 },
  { icon: "/icons/030-pills.svg", name: "Dietary", count: 7 },
  { icon: "/icons/030-pills.svg", name: "Dietary", count: 7 },
  { icon: "/icons/006-nose.svg", name: "Cough, Cold, Fever", count: 5 },
  { icon: "/icons/030-pills.svg", name: "Dietary", count: 7 },
  { icon: "/icons/004-cream.svg", name: "Cosmetics", count: 6 },
  { icon: "/icons/023-briefcase.svg", name: "Health", count: 27 },
  { icon: "/icons/008-liposuction.svg", name: "Protection", count: 24 },
  { icon: "/icons/013-syringe.svg", name: "Medication", count: 7 },
  { icon: "/icons/027-brush.svg", name: "Mouth & Teeth", count: 1 },
  { icon: "/icons/006-test-tube.svg", name: "Allergies", count: 14 },
];

const ShopPageWrapper = ({ initialProducts }: ShopPageProductListProps) => {
  const { products, hasMoreData, scrollRef } = useInfiniteProducts({
    initialProducts,
    fetcher: getPaginatedProduct,
    limit: PAGINATED_PRODUCT_PER_PAGE,
  });

  const productViewMode = useSelector(
    (state: RootState) => state.productView.mode
  );

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);

  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox className="py-8 px-5 font-montserrat bg-white shadow-sm rounded-md space-y-8">
          <CategoryCarousel category={fakeCategories} />
          <div className="flex gap-6">
            <div className="w-1/4 space-y-8">
              <ProductCategoryFilter />
              <ProductPriceRangeFilter
                value={priceRange}
                onValueChange={setPriceRange}
                min={0}
                max={200}
              />
              <BrandFilter />
              <ColorFilter />
              <ProductStatusFilter />
            </div>
            <div className="w-3/4 space-y-5">
              <ShopToolbar />
              <div
                className={
                  productViewMode === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {products.map((product, index) => (
                  <ProductDisplayCard
                    key={`${product.id}-${index}`}
                    {...product}
                    viewMode={productViewMode}
                  />
                ))}
              </div>
              <div className="text-center mt-5">
                {(hasMoreData && (
                  <div ref={scrollRef}>
                    <Button className="bg-scarlet-red px-3 py-2 rounded-lg text-white">
                      Loading...
                    </Button>
                  </div>
                )) || (
                  <Paragraph className="text-slate-400">
                    No more products to load
                  </Paragraph>
                )}
              </div>
            </div>
          </div>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default ShopPageWrapper;
