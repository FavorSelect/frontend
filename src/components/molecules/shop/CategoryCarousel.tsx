"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/atoms/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

type Category = {
  icon: string;
  name: string;
  count: number;
};

const CategoryCarousel: React.FC<{ category: Category[] }> = ({ category }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: true })]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative max-w-full mx-auto py-4">
      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-x-2">
          {category.map((category, index) => (
            <div
              key={index}
              className="flex-[0_0_auto] min-w-[100px] pr-2 text-center select-none"
            >
              <div className="flex flex-col items-center gap-2">
                <Image
                  src={category.icon}
                  alt={category.name}
                  width={50}
                  height={50}
                  className="aspect-square w-8 sm:w-12 md:w-14 object-contain"
                />
                <p className="text-sm font-semibold">{category.name}</p>
                <p className="text-xs text-gray-500">
                  {category.count} Product{category.count !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev Button */}
      <Button
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-black shadow-md disabled:cursor-default"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {/* Next Button */}
      <Button
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        className="absolute top-1/2 right-0 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-black shadow-md disabled:cursor-default"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default CategoryCarousel;
