import categoryImage from "@/assets/images/garlic-flour-fresh-red-cherry-tomatoes-tagliatelle-pasta-wooden-surface.png";
import categoryImage2 from "@/assets/images/top-view-different-seasonings-with-olive-oil-dark-space.png";
import categoryImage3 from "@/assets/images/clothes-decor-independence-day.png";
import Section from "@/components/atoms/Section";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ContainerBox from "@/components/layout/ContainerBox";
import Heading from "@/components/atoms/Heading";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import PromoCategoryCard from "@/components/molecules/product/ProductCarouselCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/molecules/slider/Carousel";

import Span from "@/components/atoms/Span";

const promoCategory = [
  {
    imageSrc: categoryImage,
    title: "Leather Mens Slipper",
  },
  {
    imageSrc: categoryImage2,
    title: "Shoes & Footwear",
  },
  {
    imageSrc: categoryImage3,
    title: "Leather Mens Slipper",
  },
  {
    imageSrc: categoryImage,
    title: "Leather Mens Slipper",
  },
  {
    imageSrc: categoryImage2,
    title: "Leather Mens Slipper",
  },
  {
    imageSrc: categoryImage3,
    title: "Leather Mens Slipper",
  },
  {
    imageSrc: categoryImage3,
    title: "Leather Mens Slipper",
  },
  {
    imageSrc: categoryImage3,
    title: "Leather Mens Slipper",
  },
];

const CountryProductsCarousel = () => {
  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox hasBackground={true} className="space-y-4">
          <div className="flex justify-between items-center font-montserrat font-semibold text-[#2E2C2C]">
            <Heading className="text-xl">Explore the Country</Heading>
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
              <CarouselContent className="flex snap-x snap-mandatory">
                {promoCategory.map((category, index) => (
                  <CarouselItem
                    key={index}
                    className="flex-shrink-0 
  basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4
  mx-1 lg:pl-2
"
                  >
                    <PromoCategoryCard
                      title={category.title}
                      image={category.imageSrc.src}
                      textColorClass="text-white"
                    />
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

export default CountryProductsCarousel;
