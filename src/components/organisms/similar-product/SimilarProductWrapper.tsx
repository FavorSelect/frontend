import Heading from "@/components/atoms/Heading";
import Section from "@/components/atoms/Section";
import Span from "@/components/atoms/Span";
import ContainerBox from "@/components/layout/ContainerBox";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import PopularProductCard from "@/components/molecules/product/PopularProductCard";
import { ProductT } from "@/types/real.product";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type SimilarProductListProps = {
  products: ProductT[];
};

const SimilarProductWrapper = ({ products }: SimilarProductListProps) => {
  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox className="py-8 px-5 bg-white shadow-sm rounded-md space-y-4">
          <div className="flex justify-between items-center font-montserrat font-semibold text-[#2E2C2C]">
            <Heading>Similar Products</Heading>
            <Link
              href="/shop"
              className="flex items-center gap-x-1 text-xs xs:text-sm sm:text-base px-2 py-1.5 font-semibold"
            >
              <Span>All Products</Span>
              <ChevronRight className="w-4 h-4 xl:w-6 xl:h-6" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {products.map((product) => (
              <PopularProductCard key={product.id} product={product} />
            ))}
          </div>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default SimilarProductWrapper;
