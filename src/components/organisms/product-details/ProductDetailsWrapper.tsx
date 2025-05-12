"use client";
import React, { useState } from "react";
import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ProductImageGallery from "@/components/molecules/product-details/ProductImageGallery";
import ProductTitlePrice from "@/components/molecules/product-details/ProductTitlePrice";
import ProductColorSelector from "@/components/molecules/product-details/ProductColorSelector";
import ProductSizeSelector from "@/components/molecules/product-details/ProductSizeSelector";
import QuantitySelector from "@/components/molecules/product-details/QuantitySelector";
import ProductActionBtn from "@/components/molecules/product-details/ProductActionBtn";
import { Product } from "@/types/Product";
import PhotoReviewSlider from "@/components/molecules/product-details/PhotoReviewSlider";
import { Button } from "@/components/atoms/Button";
import ReviewCard from "@/components/molecules/product-details/ProductReviewCard";
import Pagination from "@/components/molecules/product-details/Pagination";
import ProductDescription from "@/components/molecules/product-details/ProductDescription";

const photoReviewImages = Array(20).fill("/bag-1.jpg");

interface ProductDetailsWrapperProps {
  product: Product;
}

const ProductDetailsWrapper: React.FC<ProductDetailsWrapperProps> = ({
  product,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 8;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Page changed to:", page);
  };

  return (
    <Section className="py-7">
      <MaxWidthWrapper className="space-y-6">
        <ContainerBox className="py-8 px-5 font-montserrat bg-white shadow-sm rounded-md">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="basis-3/5">
              <ProductImageGallery slides={product.images} />
            </div>
            <div className="basis-2/5 flex flex-col space-y-6 rounded-lg px-4">
              <ProductTitlePrice
                title={product.title}
                price={product.price}
                originalPrice={product.discountPercentage}
                reviews={product.reviews.length}
                description={product.description}
              />
              <ProductColorSelector
                colors={["Gray", "Black", "Peach", "Olive", "Navy"]}
              />
              <ProductSizeSelector sizes={["XXS", "XS", "S", "M", "L", "XL"]} />
              <QuantitySelector />

              <ProductActionBtn />
            </div>
          </div>
        </ContainerBox>
        <ContainerBox className="py-8 px-5 font-montserrat bg-white shadow-sm rounded-md">
          <ProductDescription description={product.description} />
        </ContainerBox>
        <ContainerBox className="py-8 px-5 font-montserrat bg-white shadow-sm rounded-md space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">All Reviews</h2>
          </div>
          <div className="space-y-2">
            <h2 className="text-base font-normal">Photos Reviews</h2>
            <PhotoReviewSlider images={photoReviewImages} />
          </div>
          <div>
            <Button className="bg-scarlet-red text-white px-2 py-1 rounded-lg text-sm">
              Show All Reviews
            </Button>
          </div>
          {product.reviews.map((review, index) => (
            <ReviewCard
              key={index}
              name={review.reviewerName}
              date={new Date(review.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              rating={review.rating}
              comment={review.comment}
            />
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default ProductDetailsWrapper;
