/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Heading from "@/components/atoms/Heading";
import Section from "@/components/atoms/Section";
import Span from "@/components/atoms/Span";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import PopularProductCard from "@/components/molecules/product/PopularProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/molecules/slider/Carousel";
import { ProductT } from "@/types/real.product";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type CosyProductListProps = {
  products: ProductT[] | any[];
};

const CosyEveningsProductGrid = ({ products }: CosyProductListProps) => {
  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox hasBackground={true} className="space-y-4">
          <div className="flex justify-between items-center font-montserrat font-semibold text-[#2E2C2C]">
            <Heading>For cosy evenings</Heading>
            <Link
              href="/shop"
              className="flex items-center gap-x-1 text-xs xs:text-sm sm:text-base px-2 py-1.5 font-semibold"
            >
              <Span>All Products</Span>
              <ChevronRight className="w-4 h-4 xl:w-6 xl:h-6" />
            </Link>
          </div>
          <div>
            <Carousel className="overflow-hidden">
              <CarouselContent className="flex snap-x snap-mandatory select-none">
                {products.map((product, index) => (
                  <CarouselItem
                    key={index}
                    className="flex-shrink-0 
  basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 
  mx-1
"
                  >
                    <PopularProductCard key={product.id} product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white text-eerie-black rounded-full cursor-pointer shadow-md" />
              <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white text-eerie-black rounded-full cursor-pointer shadow-md" />
            </Carousel>
          </div>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default CosyEveningsProductGrid;
