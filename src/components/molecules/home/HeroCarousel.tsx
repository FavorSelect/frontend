import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";

interface HeroCarouselProps {
  images: string[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ images }) => {
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
      <div className="absolute inset-y-0 left-4 z-10 flex items-center">
        <Button
          className="rounded-full bg-white w-10 h-10 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={scrollPrev}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </Button>
      </div>

      <div className="absolute inset-y-0 right-4 z-10 flex items-center">
        <Button
          className="rounded-full bg-white w-10 h-10 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={scrollNext}
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </Button>
      </div>

      {/* Main Carousel */}
      <div
        className="relative h-full overflow-hidden rounded-xl"
        ref={emblaRef}
      >
        <div className="flex h-full select-none">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex-[0_0_100%] aspect-[1150/445]"
            >
              <Image
                src={image}
                alt={`Slide ${index}`}
                width={1150}
                height={445}
                className="w-full h-full object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <Button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "bg-scarlet-red scale-125 shadow-md"
                : "bg-gray-300"
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
