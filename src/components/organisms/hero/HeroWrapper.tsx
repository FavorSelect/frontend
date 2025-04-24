import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import HeroCarousel from "@/components/molecules/hero/HeroCarousel";
import React from "react";

const HeroWrapper = () => {
  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox className="py-6">
          <HeroCarousel />
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default HeroWrapper;
