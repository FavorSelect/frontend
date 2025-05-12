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
import { Button } from "@/components/atoms/Button";
import { useInfiniteProducts } from "@/hooks/useInfiniteProducts";

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
        <ContainerBox className="py-8 px-5 bg-white shadow-sm rounded-md space-y-4">
          <div className="flex justify-between items-center font-montserrat font-semibold text-[#2E2C2C]">
            <Heading className="text-xl">Our top picks just for you</Heading>
            <Link href="/shop" className="flex items-center">
              All Products <ChevronRight />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductDisplayCard key={product.id} {...product} />
            ))}
          </div>
          <div className="text-center mt-5">
            {(hasMoreData && (
              <div ref={scrollRef}>
                <Button className="bg-scarlet-red px-3 py-2 rounded-lg text-white">
                  Loading...
                </Button>
              </div>
            )) || (
              <Paragraph className="text-slate-400">
                No more posts to load
              </Paragraph>
            )}
          </div>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default TopPickProductGrid;
