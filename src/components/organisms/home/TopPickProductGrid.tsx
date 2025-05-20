"use client";
import ProductDisplayCard from "@/components/molecules/product/ProductDisplayCard";
import Section from "@/components/atoms/Section";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ContainerBox from "@/components/layout/ContainerBox";
import Heading from "@/components/atoms/Heading";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/Product";
import { getPaginatedProduct } from "@/actions/getProduct";
import { PAGINATED_PRODUCT_PER_PAGE } from "@/config/constants";
import Paragraph from "@/components/atoms/Paragraph";
import { useInfiniteProducts } from "@/hooks/useInfiniteProducts";
import Span from "@/components/atoms/Span";
import SkeletonProductCard from "@/components/molecules/product/SkeletonProductCard";

type TopProductListProps = {
  initialProducts: Product[];
};

const TopPickProductGrid = ({ initialProducts }: TopProductListProps) => {
  const { products, hasMoreData, scrollRef } = useInfiniteProducts({
    initialProducts,
    fetcher: getPaginatedProduct,
    limit: PAGINATED_PRODUCT_PER_PAGE,
  });

  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox hasBackground={true} className="space-y-4">
          <div className="flex justify-between items-center font-montserrat font-semibold text-[#2E2C2C]">
            <Heading className="text-xl">Our top picks just for you</Heading>
            <Link
              href="/shop"
              className="flex items-center gap-x-1 text-xs xs:text-sm sm:text-base px-2 py-1.5 font-semibold"
            >
              <Span>All Products</Span>
              <ChevronRight className="w-4 h-4 xl:w-6 xl:h-6" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {products.map((product) => (
              <ProductDisplayCard key={product.id} {...product} />
            ))}
          </div>
          <div className="mt-5">
            {(hasMoreData && (
              <div ref={scrollRef}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
                  {Array.from({ length: 5 }, (_, index) => (
                    <SkeletonProductCard key={index} />
                  ))}
                </div>
              </div>
            )) || (
              <Paragraph className="text-slate-400 text-center">
                No more products to load
              </Paragraph>
            )}
          </div>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default TopPickProductGrid;
