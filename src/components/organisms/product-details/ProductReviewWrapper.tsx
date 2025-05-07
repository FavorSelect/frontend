"use client";
import React, { useMemo, useState } from "react";
import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ReviewCard from "@/components/molecules/product-details/ProductReviewCard";
import { setSortBy } from "@/store/slices/product-details/productReviewSlice";
import { reviews } from "@/data/review";
import PhotoReviewSlider from "@/components/molecules/product-details/PhotoReviewSlider";
import { Button } from "@/components/atoms/Button";
import Pagination from "@/components/molecules/product-details/Pagination";
import Dropdown from "@/components/molecules/global/Dropdown";
import Span from "@/components/atoms/Span";

const sortOptions = [
  { label: "Recommended Sorting", value: "recommended" },
  { label: "Newest First", value: "newest" },
  { label: "Highest Rating", value: "highest" },
  { label: "Lowest Rating", value: "lowest" },
];

const photoReviewImages = Array(20).fill("/bag-1.jpg");

const ProductReviewWrapper = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state: RootState) => state.productReview.sortBy);

  const handleSortChange = (value: string) => {
    dispatch(setSortBy(value));
  };

  // review sort
  const sortedReviews = useMemo(() => {
    const cloned = [...reviews];

    switch (sortBy) {
      case "newest":
        return cloned.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case "highest":
        return cloned.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return cloned.sort((a, b) => a.rating - b.rating);
      case "recommended":
      default:
        return cloned;
    }
  }, [sortBy]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 8;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Page changed to:", page);
  };

  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox className="py-8 px-5 font-montserrat bg-white shadow-sm rounded-md space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">All Reviews</h2>
            <Dropdown
              value={sortBy}
              onChange={handleSortChange}
              options={sortOptions}
              placeholder="Choose an option"
              optionRenderer={(opt) => (
                <Span className="text-gray-800">{opt.label}</Span>
              )}
            />
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
          {sortedReviews.map((review) => (
            <ReviewCard
              key={review.id}
              name={review.name}
              date={review.date}
              rating={review.rating}
              comment={review.comment}
              images={review.images}
              likes={review.likes}
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

export default ProductReviewWrapper;
