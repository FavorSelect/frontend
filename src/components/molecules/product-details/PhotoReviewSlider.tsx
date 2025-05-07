"use client";
import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PhotoReviewSliderProps = {
  images: string[];
};

const PhotoReviewSlider: React.FC<PhotoReviewSliderProps> = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
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
    <div className="relative max-w-full mx-auto">
      {/* Carousel */}
      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div
              className="relative min-w-[120px] pr-2 flex-[0_0_auto]"
              key={index}
            >
              <Image
                src={src}
                alt={`Bag ${index + 1}`}
                width={100}
                height={100}
                className="w-[120px] h-[100px] object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Prev Button */}
      <Button
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-black text-lg shadow-md disabled:cursor-default"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      {/* Next Button */}
      <Button
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        className="absolute top-1/2 right-0 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-black text-lg shadow-md disabled:cursor-default"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default PhotoReviewSlider;
