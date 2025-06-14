import Section from "@/components/atoms/Section";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ContainerBox from "@/components/layout/ContainerBox";
import Heading from "@/components/atoms/Heading";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Span from "@/components/atoms/Span";
import { ProductT } from "@/types/real.product";
import PopularProductCard from "@/components/molecules/product/PopularProductCard";

type TopProductListProps = {
  recommendedProducts: ProductT[];
};

const TopPickProductGrid = ({ recommendedProducts }: TopProductListProps) => {
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
            {recommendedProducts.map((product) => (
              <PopularProductCard key={product.id} product={product} />
            ))}
          </div>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default TopPickProductGrid;
