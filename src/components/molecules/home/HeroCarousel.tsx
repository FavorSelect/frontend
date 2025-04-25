import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/molecules/slider/Carousel";
import heroImage from "@/assets/images/black_friday_facebook_banner_02 1.png";

const heroImages = [
  { img1: heroImage.src },
  { img1: heroImage.src },
  { img1: heroImage.src },
  { img1: heroImage.src },
  { img1: heroImage.src },
  { img1: heroImage.src },
  { img1: heroImage.src },
];

console.log(heroImages[0]);
const HeroCarousel = () => {
  return (
    <div>
      <Carousel>
        <CarouselContent className="flex justify-center">
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="basis-full">
              <Image
                src={image.img1}
                alt="vacation-package-img"
                width={1150}
                height={445}
                className="w-full h-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
