/* eslint-disable @typescript-eslint/no-explicit-any */
import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import PopularProductCard from "@/components/molecules/product/PopularProductCard";
import { ProductT } from "@/types/real.product";
import React from "react";

type CategoryPageProps = {
  products: ProductT[] | any[];
};

const CategoryPageWrapper = ({ products }: CategoryPageProps) => {
  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox hasBackground={true} className="space-y-4">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-6a3 3 0 013-3h5M9 17h6m-6 0l-4-4m0 0l4-4m-4 4h12"
                />
              </svg>
              <p className="text-xl font-semibold">No products found</p>
              <p className="text-sm mt-1">
                Try adjusting your filters or check back later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {products.map((product) => (
                <PopularProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default CategoryPageWrapper;
