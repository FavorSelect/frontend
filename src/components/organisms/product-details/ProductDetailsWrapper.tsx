"use client";
import React, { useEffect, useState } from "react";
import Section from "@/components/atoms/Section";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ProductImageGallery from "@/components/molecules/product-details/ProductImageGallery";
import ProductTitlePrice from "@/components/molecules/product-details/ProductTitlePrice";
import ProductColorSelector from "@/components/molecules/product-details/ProductColorSelector";
import ProductSizeSelector from "@/components/molecules/product-details/ProductSizeSelector";
import QuantitySelector from "@/components/molecules/product-details/QuantitySelector";
import ProductActionBtn from "@/components/molecules/product-details/ProductActionBtn";
import PhotoReviewSlider from "@/components/molecules/product-details/PhotoReviewSlider";
import ProductReviewCard from "@/components/molecules/product-details/ProductReviewCard";
import SpecRow from "@/components/molecules/product-details/SpecRow";
import RatingDistribution from "@/components/molecules/product-details/RatingDistribution";
import { calculateRatingDistribution } from "@/utils/calculateRatingDistribution";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { Tab, Tabs } from "@/components/molecules/global/Tab";
import { setProductDetailsTab } from "@/store/slices/tab/tabsSlice";
import {
  useAddReviewMutation,
  useGetEstimatedDeliveryQuery,
} from "@/store/api/productDetailsApi";
import ReviewForm from "@/components/molecules/global/ReviewForm";
import { useGetProductDetailsQuery } from "@/store/api/productDetailsApi";
import Pagination from "@/components/molecules/global/Pagination";
import ReactPlayer from "react-player";
import SkeletonProductImageGallery from "@/components/molecules/product-details/SkeletonProductImageGallery";
import SkeletonProductDetailsSidebar from "@/components/molecules/product-details/SkeletonProductDetailsSidebar";
import SkeletonTabs from "@/components/molecules/global/SkeletonTabs";
import EstimateDeliveryDate from "@/components/molecules/product-details/EstimateDeliveryDate";
import { setProductId } from "@/store/slices/product-details/productSetIdSlice";

interface ProductDetailsWrapperProps {
  token: string | undefined;
  id: string;
}

const ProductDetailsWrapper: React.FC<ProductDetailsWrapperProps> = ({
  token,
  id,
}) => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(
    (state: RootState) => state.tabs.productDetailsTab
  );
  const { data, isLoading, isError } = useGetProductDetailsQuery(id);
  const {
    data: deliveryData,
    isLoading: isDeliveryLoading,
    isError: isDeliveryError,
  } = useGetEstimatedDeliveryQuery(id);
  const shouldRenderDeliveryDate =
    deliveryData && !isDeliveryLoading && !isDeliveryError;
  const [currentPage, setCurrentPage] = useState(1);
  const [addReview] = useAddReviewMutation();

  const product = data?.product;

  useEffect(() => {
    if (!product?.id) return;
    dispatch(setProductId(product.id));
  }, [dispatch, product?.id]);

  // skeleton loader for product details
  if (isLoading || isDeliveryLoading) {
    return (
      <Section>
        <MaxWidthWrapper className="space-y-6">
          <ContainerBox hasBackground={true}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="basis-3/5">
                <SkeletonProductImageGallery />
              </div>
              <SkeletonProductDetailsSidebar />
            </div>
          </ContainerBox>

          <ContainerBox className="py-8 px-4 font-montserrat bg-white shadow-sm rounded-md">
            <SkeletonTabs tabCount={4} activeIndex={0} />
          </ContainerBox>
        </MaxWidthWrapper>
      </Section>
    );
  }

  if (isError) {
    return <div>Error loading product details.</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

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

  const ratingDistribution = calculateRatingDistribution(product.reviews || []);

  const reviewPhotos = product.reviews
    .map((review) => review.reviewPhoto)
    .filter((photo): photo is string => Boolean(photo));

  const REVIEWS_PER_PAGE = 3;

  const totalReviews = product.reviews.length;
  const totalPages = Math.ceil(totalReviews / REVIEWS_PER_PAGE);

  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const endIndex = startIndex + REVIEWS_PER_PAGE;

  const paginatedReviews = product.reviews.slice(startIndex, endIndex);

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
                reviews={product.reviews?.length ?? 0}
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
              {shouldRenderDeliveryDate && (
                <EstimateDeliveryDate {...deliveryData} />
              )}

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
              {product.reviews?.length > 0 && (
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
