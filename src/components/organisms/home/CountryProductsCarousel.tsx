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
        <ContainerBox className="py-8 px-5 bg-white shadow-sm rounded-md space-y-4">
          <div className="flex justify-between items-center font-montserrat font-semibold text-[#2E2C2C]">
            <Heading className="text-xl">Explore the Country</Heading>
            <Link href="#" className="flex items-center">
              All Products <ChevronRight />
            </Link>
          </div>
          <div>
            <Carousel>
              <CarouselContent className="flex flex-row justify-center">
                {promoCategory.map((category, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <PromoCategoryCard
                      title={category.title}
                      image={category.imageSrc.src}
                      textColorClass="text-white"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default CountryProductsCarousel;
