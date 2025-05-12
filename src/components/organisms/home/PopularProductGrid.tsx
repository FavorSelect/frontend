import Section from "@/components/atoms/Section";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import ContainerBox from "@/components/layout/ContainerBox";
import Heading from "@/components/atoms/Heading";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import ProductDisplayCard from "@/components/molecules/product/ProductDisplayCard";
import trendingBanner from "@/assets/images/trending-banner.png";
import Image from "next/image";
import { Product } from "@/types/Product";

type TopProductListProps = {
  products: Product[];
};

const PopularProductGrid = ({ products }: TopProductListProps) => {
  return (
    <Section>
      <MaxWidthWrapper>
        <ContainerBox className="py-8 px-5 bg-white shadow-sm rounded-md space-y-4">
          <div className="flex justify-between items-center font-montserrat font-semibold text-[#2E2C2C]">
            <Heading className="text-xl">The populars</Heading>
            <Link href="/shop" className="flex items-center">
              All Products <ChevronRight />
            </Link>
          </div>

          <div className="flex gap-x-3">
            <div>
              <Image
                src={trendingBanner}
                alt="Trending-banner"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductDisplayCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </ContainerBox>
      </MaxWidthWrapper>
    </Section>
  );
};

export default PopularProductGrid;
