import Section from "@/components/atoms/Section";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ContainerBox from "@/components/layout/ContainerBox";
import Heading from "@/components/atoms/Heading";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/molecules/slider/Carousel";
import Span from "@/components/atoms/Span";
import { Banner } from "@/types/banner";
import Image from "next/image";

const WeeklyPromotionProductsList = ({ banners }: { banners: Banner[] }) => {
  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox hasBackground={true} className="space-y-4">
          <div className="flex justify-between items-center font-montserrat font-semibold text-[#2E2C2C]">
            <Heading>Weekly promotion</Heading>
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
                {banners.map((banner, index) => (
                  <CarouselItem
                    key={index}
                    className="flex-shrink-0 
  basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4
  mx-1 md:pl-1
"
                  >
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      width={500}
                      height={445}
                      className="w-full h-[300px] object-cover"
                      priority={index === 0}
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

export default WeeklyPromotionProductsList;
