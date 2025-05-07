import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ProductDescription from "@/components/molecules/product-details/ProductDescription";
import React from "react";

const ProductDescriptionWrapper = () => {
  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox className="py-8 px-5 font-montserrat bg-white shadow-sm rounded-md">
          <ProductDescription />
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default ProductDescriptionWrapper;
