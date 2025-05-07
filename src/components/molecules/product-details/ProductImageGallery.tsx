import React from "react";
import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProductDetailsCarouselController } from "@/hooks/useProductDetailsCarouselController";

type EmblaCarouselProps = {
  slides: string[];
};

const ProductImageGallery: React.FC<EmblaCarouselProps> = ({ slides }) => {
  const {
    mainViewportRef,
    thumbViewportRef,
    embla,
    selectedIndex,
    onThumbClick,
  } = useProductDetailsCarouselController(slides);

  return (
    <div className="flex flex-row items-center gap-2 max-w-5xl mx-auto h-auto md:h-[600px] overflow-hidden">
      {/* Thumbnails */}
      <div className="min-w-[80px] h-[80%] hidden md:block">
        <div className="relative h-full overflow-hidden" ref={thumbViewportRef}>
          <div className="block h-full select-none">
            {slides.map((source, index) => (
              <div
                key={index}
                className={`mb-2 border group ${
                  index === selectedIndex
                    ? "selected border-scarlet-red"
                    : "border-transparent"
                }`}
              >
                <button
                  className="h-full w-full flex bg-transparent"
                  onClick={() => onThumbClick(index)}
                  type="button"
                >
                  <Image
                    className={`object-cover w-full h-full ${
                      index === selectedIndex ? "opacity-100" : "opacity-20"
                    }`}
                    src={source}
                    alt={`Thumbnail ${index}`}
                    height={80}
                    width={80}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main carousel */}
      <div className="pl-2 flex-grow relative">
        <div className="absolute inset-y-0 left-2 z-10 flex items-center">
          <Button
            className="rounded-full bg-white w-9 h-9"
            onClick={() => embla?.scrollPrev()}
            aria-label="Previous Slide"
          >
            <ChevronLeft />
          </Button>
        </div>
        <div className="absolute inset-y-0 right-0 z-10 flex items-center">
          <Button
            className="rounded-full bg-white w-9 h-9"
            onClick={() => embla?.scrollNext()}
            aria-label="Next Slide"
          >
            <ChevronRight />
          </Button>
        </div>
        <div className="relative h-full overflow-hidden" ref={mainViewportRef}>
          <div className="flex h-full select-none">
            {slides.map((source, index) => (
              <div className="relative flex-[0_0_100%]" key={index}>
                <Image
                  src={source}
                  alt={`Slide ${index}`}
                  width={400}
                  height={300}
                  className="w-auto h-auto object-cover"
                  priority={true}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;
