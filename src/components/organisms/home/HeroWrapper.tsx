"use client";
import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import HeroCarousel from "@/components/molecules/home/HeroCarousel";
import { Banner } from "@/types/banner";
import React from "react";

const HeroWrapper = ({ banners }: { banners: Banner[] }) => {
  if (!banners || banners.length === 0) return null;
  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox className="py-0 px-0 xl:py-0 xl:px-0">
          <HeroCarousel banners={banners} />
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default HeroWrapper;
