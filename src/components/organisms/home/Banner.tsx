import React from "react";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ContainerBox from "@/components/layout/ContainerBox";
import Image from "next/image";
import Section from "@/components/atoms/Section";
import Link from "next/link";
import { Banner as BannerType } from "@/types/banner";

type BannerPropTypes = {
  banners: BannerType[];
};

const Banner = ({ banners }: BannerPropTypes) => {
  if (!banners || banners.length === 0) return null;
  const brandBanner = banners[0];
  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox className="py-0 px-0 xl:py-0 xl:px-0">
          <Link href="#">
            <Image
              src={brandBanner.image}
              alt={brandBanner.title}
              width={1170}
              height={330}
              quality={100}
              className="w-full h-[200px] sm:h-[400px] object-cover rounded-2xl"
            />
          </Link>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default Banner;
