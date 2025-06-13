import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Banner } from "@/types/banner";

const HeroCarousel = ({ banners }: { banners: Banner[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      skipSnaps: false,
      align: "center",
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnFocusIn: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    // Initialize carousel and update dots
    emblaApi.reInit();
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    // Cleanup on unmount
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full max-w-full mx-auto">
      {/* Navigation Buttons */}
      <div className="absolute inset-y-0 left-1 lg:left-2 xl:left-4 z-10 flex items-center">
        <Button
          className="rounded-full bg-white text-eerie-black shadow-md w-9 h-9 cursor-pointer"
          onClick={scrollPrev}
          aria-label="Previous Slide"
        >
          <ChevronLeft />
        </Button>
      </div>

      <div className="absolute inset-y-0 right-1 lg:right-2 xl:right-4 z-10 flex items-center">
        <Button
          className="rounded-full bg-white text-eerie-black shadow-md w-9 h-9 cursor-pointer"
          onClick={scrollNext}
          aria-label="Next Slide"
        >
          <ChevronRight />
        </Button>
      </div>

      {/* Main Carousel */}
      <div
        className="relative overflow-hidden rounded-xl h-[200px] sm:h-[550px]"
        ref={emblaRef}
      >
        <div className="flex h-full select-none">
          {banners.map((banner, index) => (
            <div key={index} className="relative flex-[0_0_100%] aspect-[16/9]">
              <Image
                src={banner.image}
                alt={banner.title}
                width={1000}
                height={445}
                className="w-full h-full object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
        {banners.map((_, index) => (
          <Button
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex ? "bg-scarlet-red scale-125" : "bg-white"
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
