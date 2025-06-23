/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/atoms/Button";
import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import BrandFilter from "@/components/molecules/shop/BrandFilter";
import CategoryCarousel from "@/components/molecules/shop/CategoryCarousel";
import ColorFilter from "@/components/molecules/shop/ColorFilter";
import ProductCategoryFilter from "@/components/molecules/shop/ProductCategoryFilter";
import ProductPriceRangeFilter from "@/components/molecules/shop/ProductPriceRangeFilter";
import ProductStatusFilter from "@/components/molecules/shop/ProductStatusFilter";
import ShopMobileFilter from "@/components/molecules/shop/ShopMobileFilter";
import ShopProductList from "@/components/molecules/shop/ShopProductList";
import ShopToolBar from "@/components/molecules/shop/ShopToolBar";
import { setPending } from "@/store/slices/filterUI.slice";
import { RootState } from "@/store/store";
import { ProductT } from "@/types/real.product";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";

type CategoryCarouselType = {
  icon: string;
  name: string;
  count: number;
};

type Brand = { name: string; count: number };
type Color = { name: string; count: number; hex: string };
type Status = { name: string; count: number };

type ShopPageProductListProps = {
  products: ProductT[] | any[];
  categories: string[];
  brands: Brand[];
  priceRange: [number, number];
  colors: Color[];
  statuses: Status[];
  categoryCarouselData: CategoryCarouselType[];
};

const ShopPageWrapper = ({
  products,
  categories,
  brands,
  priceRange: backendRange,
  colors,
  statuses,
  categoryCarouselData,
}: ShopPageProductListProps) => {
  const productViewMode = useSelector(
    (state: RootState) => state.productView.mode
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();

  const appliedFilterCount = Array.from(searchParams.entries()).reduce(
    (count, [key, value]) => {
      if (
        [
          "categories",
          "brands",
          "colors",
          "inventoryStatus",
          "maxPrice",
          "minPrice",
          "sortBy",
        ].includes(key) &&
        value.trim() !== ""
      ) {
        return count + 1;
      }
      return count;
    },
    0
  );

  const handleResetFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    [
      "categories",
      "brands",
      "colors",
      "inventoryStatus",
      "maxPrice",
      "minPrice",
      "sortBy",
    ].forEach((key) => params.delete(key));

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };
  useEffect(() => {
    dispatch(setPending(isPending));
  }, [isPending, dispatch]);

  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox hasBackground={true} className="space-y-8">
          <CategoryCarousel category={categoryCarouselData} />
          <div className="flex gap-3 items-center">
            {appliedFilterCount > 0 && (
              <span className="text-sm font-medium text-gray-700">
                {appliedFilterCount} filter{appliedFilterCount !== 1 ? "s" : ""}{" "}
                applied
              </span>
            )}
            {appliedFilterCount > 0 && !isPending && (
              <Button onClick={handleResetFilters} variant="resetBtn">
                Reset All Filters
              </Button>
            )}
          </div>
          <div className="flex gap-6">
            <div className="w-1/4 space-y-8 hidden lg:block">
              <ProductCategoryFilter categories={categories} />
              <ProductPriceRangeFilter
                min={backendRange[0]}
                max={backendRange[1]}
              />
              <BrandFilter brands={brands} />
              <ColorFilter colors={colors} />
              <ProductStatusFilter statuses={statuses} />
            </div>
            <div className="w-full lg:w-3/4 space-y-5">
              <div className="flex items-center no-scrollbar space-x-2 md:space-y-0 pb-3 md:pb-0">
                <ShopMobileFilter>
                  <div className="flex gap-3 items-center">
                    {appliedFilterCount > 0 && (
                      <span className="text-sm font-medium text-gray-700">
                        {appliedFilterCount} filter
                        {appliedFilterCount !== 1 ? "s" : ""} applied
                      </span>
                    )}
                    {appliedFilterCount > 0 && !isPending && (
                      <Button onClick={handleResetFilters} variant="resetBtn">
                        Reset All Filters
                      </Button>
                    )}
                  </div>
                  <ProductCategoryFilter categories={categories} />
                  <ProductPriceRangeFilter
                    min={backendRange[0]}
                    max={backendRange[1]}
                  />
                  <BrandFilter brands={brands} />
                  <ColorFilter colors={colors} />
                  <ProductStatusFilter statuses={statuses} />
                </ShopMobileFilter>
                <ShopToolBar />
              </div>
              <ShopProductList products={products} viewMode={productViewMode} />
            </div>
          </div>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default ShopPageWrapper;
