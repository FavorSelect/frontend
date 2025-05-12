"use client";
import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import HeroCarousel from "@/components/molecules/home/HeroCarousel";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import heroImage from "@/assets/images/black_friday_facebook_banner_02 1.png";

const HeroWrapper = () => {
  const router = useRouter();
  useEffect(() => {
    console.log("Current URL:", window.location.href);
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      router.replace("/");
    }
  }, [router]);

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
        <ContainerBox className="py-6">
          <HeroCarousel images={images} />
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default HeroWrapper;
