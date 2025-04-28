import React from "react";
import banner from "@/assets/images/banner.png";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ContainerBox from "@/components/layout/ContainerBox";
import Image from "next/image";
import Section from "@/components/atoms/Section";
import Link from "next/link";

const Banner = () => {
  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox className="py-8">
          <Link href="#">
            <Image
              src={banner}
              alt="banner"
              width={1170}
              height={330}
              quality={100}
              className="w-full h-auto rounded-2xl"
            />
          </Link>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default Banner;
