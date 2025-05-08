"use client";
import React from "react";
import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ProductImageGallery from "@/components/molecules/product-details/ProductImageGallery";
import ProductTitlePrice from "@/components/molecules/product-details/ProductTitlePrice";
import ProductColorSelector from "@/components/molecules/product-details/ProductColorSelector";
import ProductSizeSelector from "@/components/molecules/product-details/ProductSizeSelector";
import QuantitySelector from "@/components/molecules/product-details/QuantitySelector";
import ProductActionBtn from "@/components/molecules/product-details/ProductActionBtn";

const ProductDetailsWrapper = () => {
  const SLIDES = [
    "/boot.jpg",
    "/boot.jpg",
    "/boot.jpg",
    "/boot.jpg",
    "/boot.jpg",
    "/boot.jpg",
    "/boot.jpg",
    "/boot.jpg",
  ];

  return (
    <Section className="py-7">
      <MaxWidthWrapper>
        <ContainerBox className="py-8 px-5 font-montserrat bg-white shadow-sm rounded-md">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="basis-3/5">
              <ProductImageGallery slides={SLIDES} />
            </div>
            <div className="basis-2/5 flex flex-col space-y-6 rounded-lg px-4">
              <ProductTitlePrice
                title="Hand-stitched Leather Men Boots Casual"
                price={9.9}
                originalPrice={14.9}
                reviews={10}
              />
              <ProductColorSelector
                colors={["Gray", "Black", "Peach", "Olive", "Navy"]}
              />
              <ProductSizeSelector sizes={["XXS", "XS", "S", "M", "L", "XL"]} />
              <QuantitySelector />

              <ProductActionBtn />
            </div>
          </div>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default ProductDetailsWrapper;
