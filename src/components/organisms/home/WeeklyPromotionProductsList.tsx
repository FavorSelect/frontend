import categoryImage from "@/assets/images/professional-makeup-tools-colored-background.png";
import categoryImage2 from "@/assets/images/still-life-say-no-fast-fashion.png";
import categoryImage3 from "@/assets/images/beauty-care-cosmetic-product-with-pink-tones.png";
import Section from "@/components/atoms/Section";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ContainerBox from "@/components/layout/ContainerBox";
import Heading from "@/components/atoms/Heading";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import ProductCarouselCard from "@/components/molecules/product/ProductCarouselCard";
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
    subTitle: "Sale",
  },
  {
    imageSrc: categoryImage2,
    title: "Shoes & Footwear",
    subTitle: "Sale",
  },
  {
    imageSrc: categoryImage3,
    title: "Leather Mens Slipper",
    subTitle: "Sale",
  },
  {
    imageSrc: categoryImage,
    title: "Leather Mens Slipper",
    subTitle: "Sale",
  },
  {
    imageSrc: categoryImage2,
    title: "Leather Mens Slipper",
    subTitle: "Sale",
  },
  {
    imageSrc: categoryImage3,
    title: "Leather Mens Slipper",
    subTitle: "Sale",
  },
  {
    imageSrc: categoryImage3,
    title: "Leather Mens Slipper",
    subTitle: "Sale",
  },
  {
    imageSrc: categoryImage3,
    title: "Leather Mens Slipper",
    subTitle: "Sale",
  },
];

const WeeklyPromotionProductsList = () => {
  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox className="py-8 px-5 bg-white shadow-sm rounded-md space-y-4">
          <div className="flex justify-between items-center font-montserrat font-semibold text-[#2E2C2C]">
            <Heading className="text-xl">Weekly promotion</Heading>
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
                    <ProductCarouselCard
                      title={category.title}
                      subtitle={category.subTitle}
                      image={category.imageSrc.src}
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

export default WeeklyPromotionProductsList;
