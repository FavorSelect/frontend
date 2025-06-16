"use client";
import React from "react";
import { RootState } from "@/store/store";
import SkeletonProductCard from "@/components/molecules/product/SkeletonProductCard";
import PopularProductCard from "../../molecules/product/PopularProductCard";
import Section from "../../atoms/Section";
import MaxWidthWrapper from "../../layout/MaxWidthWrapper";
import ContainerBox from "../../layout/ContainerBox";
import { useAppSelector } from "@/store/hook";

const SearchResultsWrapper = () => {
  const { products, labels, isLoading, isError } = useAppSelector(
    (state: RootState) => state.search
  );

  const skeletonArray = new Array(8).fill(null);

  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox hasBackground={true} className="space-y-4">
          <div>
            {!isLoading &&
              !isError &&
              products.length > 0 &&
              labels.length > 0 && (
                <div className="mb-5 flex flex-wrap gap-2 text-sm text-gray-700 items-center">
                  <span className="font-semibold">Matched labels:</span>
                  {labels.map((label, idx) => (
                    <span
                      key={idx}
                      className="bg-[#fff1f1] text-scarlet-red px-3 py-1 rounded-full text-xs sm:text-xm"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
            {isLoading && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {skeletonArray.map((_, index) => (
                  <SkeletonProductCard key={index} />
                ))}
              </div>
            )}

            {!isLoading && isError && (
              <div className="p-10 text-center text-red-500">
                Failed to fetch products. Please try again.
              </div>
            )}

            {!isLoading && !isError && products.length === 0 && (
              <div className="p-10 text-center text-gray-600">
                No products matched with your search.
              </div>
            )}

            {!isLoading && !isError && products.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {products.map((product) => (
                  <PopularProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};
export default SearchResultsWrapper;
