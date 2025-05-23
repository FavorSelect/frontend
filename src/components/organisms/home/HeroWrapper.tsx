"use client";
import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import HeroCarousel from "@/components/molecules/home/HeroCarousel";
import React from "react";
import heroImage from "@/assets/images/black_friday_facebook_banner_02 1.png";

const HeroWrapper = () => {
  const images = [
    heroImage.src,
    heroImage.src,
    heroImage.src,
    heroImage.src,
    heroImage.src,
    heroImage.src,
  ];
  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox className="py-0 px-0 xl:py-0 xl:px-0">
          <HeroCarousel images={images} />
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default HeroWrapper;
