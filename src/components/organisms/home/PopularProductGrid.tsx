/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Section from "@/components/atoms/Section";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ContainerBox from "@/components/layout/ContainerBox";
import Heading from "@/components/atoms/Heading";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Span from "@/components/atoms/Span";
import { Banner } from "@/types/banner";
import { ProductT } from "@/types/real.product";
import PopularProductCard from "@/components/molecules/product/PopularProductCard";

type TopProductListProps = {
  products: ProductT[] | any[];
  banners: Banner[];
};

const PopularProductGrid = ({ products, banners }: TopProductListProps) => {
  const hasProducts = products && products.length > 0;
  const hasBanner = banners && banners.length > 0;
  const popularBanner = hasBanner ? banners[0] : null;

  // ✅ Return nothing if both are missing
  if (!hasProducts && !hasBanner) return null;

  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox hasBackground={true} className="space-y-4">
          <div className="flex justify-between items-center font-montserrat font-semibold text-[#2E2C2C]">
            <Heading className="text-xl">The populars</Heading>
            <Link
              href="/shop"
              className="flex items-center gap-x-1 text-xs xs:text-sm sm:text-base px-2 py-1.5 font-semibold"
            >
              <Span>All Products</Span>
              <ChevronRight className="w-4 h-4 xl:w-6 xl:h-6" />
            </Link>
          </div>

          <div className="flex gap-x-3">
            {hasBanner && (
              <div className="hidden xl:block flex-1/5">
                <Image
                  src={popularBanner!.image}
                  alt={popularBanner!.title}
                  className="w-full h-full object-cover rounded-2xl"
                  width={800}
                  height={800}
                />
              </div>
            )}

            {hasProducts && (
              <div className="flex-1 xl:flex-4/5 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {products.map((product) => (
                  <PopularProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default PopularProductGrid;
