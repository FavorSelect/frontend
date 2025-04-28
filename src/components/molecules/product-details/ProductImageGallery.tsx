"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/molecules/slider/Carousel";
import categoryImage from "@/assets/images/professional-makeup-tools-colored-background.png";
import categoryImage2 from "@/assets/images/still-life-say-no-fast-fashion.png";
import categoryImage3 from "@/assets/images/beauty-care-cosmetic-product-with-pink-tones.png";

const images = [categoryImage, categoryImage, categoryImage2, categoryImage3];

const ProductImageGallery: React.FC = () => {
  // State to track the currently previewed image
  const [previewImage, setPreviewImage] = useState(categoryImage);

  return (
    <div className="flex flex-col gap-2">
      {/* Preview Image */}
      <div>
        <Image
          src={previewImage}
          alt={`preview-img`}
          width={700}
          height={405}
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>

      {/* Carousel */}
      <div>
        <Carousel>
          <CarouselContent className="flex flex-row justify-center">
            {images.map((img, index) => (
              <CarouselItem
                key={index}
                className="basis-full md:basis-1/2 lg:basis-1/3"
                onClick={() => setPreviewImage(img)}
              >
                <Image
                  src={img}
                  alt={`carousel-img-${index + 1}`}
                  width={367}
                  height={190}
                  className="w-ull rounded-lg cursor-pointer"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex py-2 justify-between items-center">
            <div className="flex items-center gap-2">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default ProductImageGallery;
