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
import { ProductT } from "@/types/real.product";
import { Tab, Tabs } from "@/components/molecules/global/Tab";
import { setProductDetailsTab } from "@/store/slices/tab/tabsSlice";
import SpecRow from "@/components/molecules/product-details/SpecRow";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import ReactPlayer from "react-player";
import PhotoReviewSlider from "@/components/molecules/product-details/PhotoReviewSlider";
import RatingDistribution from "@/components/molecules/product-details/RatingDistribution";
import ProductReviewCard from "@/components/molecules/product-details/ProductReviewCard";
import Pagination from "@/components/molecules/global/Pagination";
import { calculateRatingDistribution } from "@/utils/calculateRatingDistribution";
import {
  useAddReviewMutation,
  useGetProductReviewsQuery,
} from "@/store/api/productDetailsApi";
import ReviewForm from "@/components/molecules/global/ReviewForm";
import Spinner from "@/components/molecules/global/Spinner";

interface ProductDetailsWrapperProps {
  product: ProductT;
  token: string | undefined;
}

const ProductDetailsWrapper: React.FC<ProductDetailsWrapperProps> = ({
  product,
  token,
}) => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(
    (state: RootState) => state.tabs.productDetailsTab
  );
  const { data: reviews, isLoading } = useGetProductReviewsQuery(
    product.id.toString()
  );

  console.log(product.totalCustomerReviews);
  const [addReview] = useAddReviewMutation();

  const reviewList = reviews?.reviews ?? [];

  const [currentPage, setCurrentPage] = useState(1);
  const productSizes = product.productSizes
    ? product.productSizes.split(", ")
    : [];

  const productColors = product.productColors
    ? product.productColors.split(", ")
    : [];

  const hasSpecs =
    !!product.inventoryStatus ||
    !!product.productWeight ||
    !!product.productModelNumber ||
    !!product.productSizes?.length ||
    !!product.productColors?.length ||
    !!product.productMaterial ||
    !!product.productDimensions ||
    !!product.productWarrantyInfo ||
    !!product.productReturnPolicy;

  const ratingDistribution = calculateRatingDistribution(reviewList);

  const reviewPhotos = reviewList
    .map((review) => review.reviewPhoto)
    .filter((photo): photo is string => Boolean(photo));

  const REVIEWS_PER_PAGE = 3;

  const totalReviews = reviewList.length;
  const totalPages = Math.ceil(totalReviews / REVIEWS_PER_PAGE);

  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const endIndex = startIndex + REVIEWS_PER_PAGE;

  const paginatedReviews = reviewList.slice(startIndex, endIndex);

  return (
    <Section>
      <MaxWidthWrapper className="space-y-6">
        <ContainerBox hasBackground={true}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="basis-3/5">
              {(product.galleryImageUrls?.length ||
                product.productVideoUrl) && (
                <ProductImageGallery slides={product.galleryImageUrls} />
              )}
            </div>
            <div className="basis-2/5 flex flex-col space-y-4 md:space-y-6 rounded-lg px-4">
              <ProductTitlePrice
                title={product.productName}
                price={product.productPrice}
                originalPrice={product.productDiscountPercentage ?? undefined}
                reviews={reviewList.length ?? 0}
                description={product.productDescription}
                tag={
                  product.productBestSaleTag?.slice(
                    0,
                    product.productBestSaleTag.length - 1
                  ) ?? "Best Deals"
                }
              />
              {product.productColors && (
                <ProductColorSelector colors={productColors} />
              )}
              {product.productSizes && (
                <ProductSizeSelector sizes={productSizes} />
              )}
              <QuantitySelector
                productInStock={product.availableStockQuantity}
              />

              <ProductActionBtn />
            </div>
          </div>
        </ContainerBox>

        <ContainerBox className="py-8 px-4 font-montserrat bg-white shadow-sm rounded-md">
          <Tabs
            activeTab={activeTab}
            onTabChange={(tab) => dispatch(setProductDetailsTab(tab))}
          >
            <Tab label="Description">
              <div className="text-gray-800">
                <p className="text-sm sm:text-base">
                  {product.productDescription}
                </p>
                {product.productTags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {product.productTags.split(" ").map((tag, index) => (
                      <span
                        key={index}
                        className="bg-[#FFECEC] text-[#FE5E5E] text-xs font-semibold py-1 px-3 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Tab>
            <Tab label="Specifications">
              {hasSpecs && (
                <div className="divide-y space-y-3 divide-gray-200 text-sm">
                  {product.inventoryStatus && (
                    <SpecRow
                      label="Stock"
                      value={`${product.inventoryStatus}`}
                    />
                  )}
                  {product.productWeight && (
                    <SpecRow
                      label="Weight"
                      value={`${product.productWeight} kg`}
                    />
                  )}
                  {product.productModelNumber && (
                    <SpecRow
                      label="Model Number"
                      value={product.productModelNumber}
                    />
                  )}
                  {product.productSizes?.length && (
                    <SpecRow label="Sizes" value={product.productSizes} />
                  )}
                  {product.productColors?.length && (
                    <SpecRow label="Colors" value={product.productColors} />
                  )}
                  {product.productMaterial && (
                    <SpecRow label="Material" value={product.productMaterial} />
                  )}
                  {product.productDimensions && (
                    <SpecRow
                      label="Dimensions"
                      value={product.productDimensions
                        .replace(/\s+/g, " ")
                        .replace(/["{}]/g, "")}
                    />
                  )}
                  {product.productWarrantyInfo && (
                    <SpecRow
                      label="Warranty"
                      value={product.productWarrantyInfo}
                    />
                  )}
                  {product.productReturnPolicy && (
                    <SpecRow
                      label="Return Policy"
                      value={product.productReturnPolicy}
                    />
                  )}
                </div>
              )}
            </Tab>
            <Tab label="Review">
              {isLoading ? (
                <div className="py-10 text-center">
                  <Spinner className="mx-auto text-scarlet-red" />
                  <p className="text-gray-500 mt-2">Loading reviews...</p>
                </div>
              ) : reviewList?.length > 0 ? (
                <div className="space-y-3">
                  {reviewPhotos.length > 0 && (
                    <div className="mt-5">
                      <PhotoReviewSlider images={reviewPhotos} />
                    </div>
                  )}
                  <div className="space-y-4 text-gray-800">
                    <RatingDistribution
                      averageRating={product.averageCustomerRating}
                      totalReviews={product.totalCustomerReviews}
                      ratings={ratingDistribution}
                    />
                  </div>

                  <div className="mt-6 space-y-6">
                    {paginatedReviews.map((review) => (
                      <ProductReviewCard
                        key={review.id}
                        review={review}
                        token={token}
                      />
                    ))}

                    {totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                        className="justify-end pt-3"
                      />
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 py-4">No reviews yet.</p>
              )}

              <h2 className="text-xl font-bold mb-2 text-left">Add Review</h2>
              <ReviewForm
                productId={product.id}
                token={token}
                addReviewMutation={[addReview]}
              />
            </Tab>

            <Tab label="Video">
              <ReactPlayer
                url={product.productVideoUrl}
                controls
                width="100%"
                height="100%"
                className="react-player rounded-md"
                config={{
                  youtube: {
                    playerVars: {
                      modestbranding: 0,
                      rel: 0,
                      showinfo: 1,
                      fs: 1,
                      cc_load_policy: 1,
                      autoplay: 0,
                    },
                  },
                }}
              />
            </Tab>
          </Tabs>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default ProductDetailsWrapper;
