import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ProductImageGallery from "@/components/molecules/product-details/ProductImageGallery";
import React from "react";

const ProductDetailsWrapper = () => {
  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox className="py-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="basis-3/5 bg-white shadow-sm rounded-md border p-3">
              <div className="flex flex-row gap-x-1">
                <div className="basis-2/5">
                  <ProductImageGallery />
                </div>
                <div className="basis-3/5">
                  <h2>Product info</h2>
                </div>
              </div>
            </div>
            <div className="basis-2/5 flex flex-col space-y-4 rounded-lg border">
              <h2>product information</h2>
            </div>
          </div>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default ProductDetailsWrapper;
